package com.skillpilot.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillpilot.backend.dto.AnswerResponse;
import com.skillpilot.backend.dto.InterviewReportResponse;
import com.skillpilot.backend.model.InterviewAnswer;
import com.skillpilot.backend.model.MockInterviewSession;
import com.skillpilot.backend.repository.InterviewAnswerRepository;
import com.skillpilot.backend.repository.MockInterviewSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.List;

@Service
public class MockInterviewService {

    @Autowired
    private MockInterviewSessionRepository repository;

    @Autowired
    private GeminiService geminiService;   // ✅ FIX ADDED

    @Autowired
    private InterviewAnswerRepository interviewAnswerRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    public MockInterviewSession createSession(
            String email,
            List<String> questions
    ) throws Exception {

        MockInterviewSession session = new MockInterviewSession();

        session.setUserEmail(email);

        session.setQuestionsJson(
                mapper.writeValueAsString(questions)
        );

        session.setCurrentQuestion(0);

        session.setStatus("ACTIVE");

        return repository.save(session);
    }

    public String getCurrentQuestion(Long sessionId) throws Exception {

        MockInterviewSession session =
                repository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

        List<String> questions =
                mapper.readValue(
                        session.getQuestionsJson(),
                        mapper.getTypeFactory()
                                .constructCollectionType(
                                        List.class,
                                        String.class
                                )
                );

        int currentIndex =
                session.getCurrentQuestion();

        if (currentIndex >= questions.size()) {
            return "INTERVIEW_COMPLETED";
        }

        return questions.get(currentIndex);
    }

    public int getCurrentQuestionIndex(Long sessionId) {

        MockInterviewSession session =
                repository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

        return session.getCurrentQuestion();
    }
    public AnswerResponse submitAnswer(
            Long sessionId,
            String answer
    ) throws Exception {

        System.out.println("ANSWER API HIT");
        MockInterviewSession session =
                repository.findById(sessionId)
                        .orElseThrow(() ->
                                new RuntimeException("Session not found"));

        List<String> questions =
                mapper.readValue(
                        session.getQuestionsJson(),
                        mapper.getTypeFactory()
                                .constructCollectionType(
                                        List.class,
                                        String.class
                                )
                );

        int currentIndex = session.getCurrentQuestion();



        if (currentIndex >= questions.size()) {
            throw new RuntimeException(
                    "Interview already completed. Generate the report."
            );
        }

        String currentQuestion =
                questions.get(currentIndex);



        // ✅ THIS NOW WORKS
        String feedback =
                geminiService.generateFeedback(
                        currentQuestion,
                        answer
                );




// 2. Extract score from feedback (simple approach for now)
        int score = extractScore(feedback);
        System.out.println("==============");
        System.out.println("FEEDBACK = " + feedback);
        System.out.println("EXTRACTED SCORE = " + score);
        System.out.println("==============");
// 3. SAVE Q&A IN DB (🔥 NEW PART)
        InterviewAnswer interviewAnswer = new InterviewAnswer();
        interviewAnswer.setSessionId(sessionId);
        interviewAnswer.setQuestion(currentQuestion);
        interviewAnswer.setAnswer(answer);
        interviewAnswer.setFeedback(feedback);
        interviewAnswer.setScore(score);

        interviewAnswerRepository.save(interviewAnswer);

        session.setCurrentQuestion(currentIndex + 1);
        if (session.getCurrentQuestion() >= questions.size()) {
            session.setStatus("COMPLETED");
        }
        repository.save(session);

        boolean nextQuestionAvailable =
                session.getCurrentQuestion() < questions.size();

        return new AnswerResponse(
                feedback,
                nextQuestionAvailable
        );
    }
    private int extractScore(String feedback) {

        try {

            Pattern pattern =
                    Pattern.compile("score\\s*:?\\s*(\\d+)", Pattern.CASE_INSENSITIVE);

            Matcher matcher = pattern.matcher(feedback);

            if (matcher.find()) {
                return Integer.parseInt(matcher.group(1));
            }

            pattern = Pattern.compile("(\\d+)\\s*/\\s*10");

            matcher = pattern.matcher(feedback);

            if (matcher.find()) {
                return Integer.parseInt(matcher.group(1));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return 5;
    }
    public InterviewReportResponse getInterviewReport(
            Long sessionId
    ) {

        List<InterviewAnswer> answers =
                interviewAnswerRepository
                        .findBySessionId(sessionId);

        if (answers.isEmpty()) {
            throw new RuntimeException(
                    "No interview answers found"
            );
        }

        int totalScore =
                answers.stream()
                        .mapToInt(
                                InterviewAnswer::getScore
                        )
                        .sum();

        double averageScore =
                (double) totalScore
                        / answers.size();

        return new InterviewReportResponse(
                answers.size(),
                totalScore,
                averageScore,
                answers
        );
    }
}