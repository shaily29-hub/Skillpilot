package com.skillpilot.backend.controller;

import com.skillpilot.backend.dto.*;
import com.skillpilot.backend.model.MockInterviewSession;
import com.skillpilot.backend.service.GeminiService;
import com.skillpilot.backend.service.InterviewPdfReportService;
import com.skillpilot.backend.service.MockInterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/mock-interview")
@CrossOrigin("*")

public class MockInterviewController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private MockInterviewService mockInterviewService;

    @Autowired
    private InterviewPdfReportService interviewPdfReportService;

    @PostMapping("/start")
    public ResponseEntity<?> startInterview(
            @RequestBody StartInterviewRequest request
    ) throws Exception {
        System.out.println(
                SecurityContextHolder.getContext()
                        .getAuthentication()
        );
        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        String questionsText =
                geminiService.generateInterviewQuestions(
                        request.getSkills(),
                        request.getRole(),
                        request.getQuestionCount()
                );

        List<String> questions =
                List.of(questionsText.split("\n"));

        MockInterviewSession session =
                mockInterviewService.createSession(
                        email,
                        questions
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Interview Started",
                        session
                )
        );
    }

    @GetMapping("/question/{sessionId}")
    public ResponseEntity<?> getCurrentQuestion(
            @PathVariable Long sessionId
    ) throws Exception {

        String question =
                mockInterviewService
                        .getCurrentQuestion(sessionId);

        if(question.equals("INTERVIEW_COMPLETED")) {

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            true,
                            "Interview Completed",
                            null
                    )
            );
        }

        int questionNumber =
                mockInterviewService
                        .getCurrentQuestionIndex(sessionId) + 1;

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Question fetched successfully",
                        new QuestionResponse(
                                questionNumber,
                                question
                        )
                )
        );
    }

    @PostMapping("/answer")
    public ResponseEntity<?> submitAnswer(
            @RequestBody AnswerRequest request
    ) throws Exception {

        AnswerResponse response =
                mockInterviewService.submitAnswer(
                        request.getSessionId(),
                        request.getAnswer()
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Answer evaluated successfully",
                        response
                )
        );
    }

    @GetMapping("/report/{sessionId}")
    public ResponseEntity<?> getInterviewReport(
            @PathVariable Long sessionId
    ) {

        InterviewReportResponse report =
                mockInterviewService
                        .getInterviewReport(
                                sessionId
                        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Interview Report Generated",
                        report
                )
        );  
    }

    @GetMapping("/report/{sessionId}/pdf")
    public ResponseEntity<byte[]> downloadInterviewReport(
            @PathVariable Long sessionId
    ) {

        InterviewReportResponse report =
                mockInterviewService
                        .getInterviewReport(
                                sessionId
                        );

        byte[] pdf =
                interviewPdfReportService
                        .generatePdfReport(report);

        return ResponseEntity.ok()
                .header(
                        "Content-Disposition",
                        "attachment; filename=interview-report.pdf"
                )
                .header(
                        "Content-Type",
                        "application/pdf"
                )
                .body(pdf);
    }
}