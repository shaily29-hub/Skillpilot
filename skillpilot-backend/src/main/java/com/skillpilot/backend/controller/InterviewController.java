package com.skillpilot.backend.controller;

import com.skillpilot.backend.dto.ApiResponse;
import com.skillpilot.backend.dto.InterviewFeedbackRequest;
import com.skillpilot.backend.dto.InterviewRequest;
import com.skillpilot.backend.dto.InterviewResponse;
import com.skillpilot.backend.model.Resume;
import com.skillpilot.backend.repository.ResumeRepository;
import com.skillpilot.backend.service.GeminiService;
import com.skillpilot.backend.service.InterviewService;
import com.skillpilot.backend.service.ResumeAnalysisService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin("*")
public class InterviewController {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ResumeAnalysisService resumeAnalysisService;

    @Autowired
    private InterviewService interviewService;

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateInterviewQuestions(
            @RequestBody InterviewRequest request
    ) {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Resume resume = resumeRepository
                .findById(request.getResumeId())
                .orElseThrow();

        // allow owner OR admin
        if (!isAdmin && !resume.getUserEmail().equals(email)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        Map<String, Object> analysis =
                resumeAnalysisService.analyze(resume.getExtractedText());

        List<String> skills =
                (List<String>) analysis.get("skills");

        List<String> questions =
                interviewService.generateQuestions(
                        skills,
                        request.getRole()
                );

        InterviewResponse response = new InterviewResponse();
        response.setQuestions(questions);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluateAnswer(
            @RequestBody Map<String, String> request
    ) {

        String question = request.get("question");
        String answer = request.get("answer");

        int score = 5;
        String feedback = "Average answer";

        if (answer.toLowerCase().contains("encapsulation")) {
            score = 9;
            feedback = "Good understanding of OOP concepts";
        }

        Map<String, Object> response = new HashMap<>();

        response.put("score", score);
        response.put("feedback", feedback);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/feedback")
    public ResponseEntity<ApiResponse<Map<String, String>>> generateFeedback(
            @RequestBody InterviewFeedbackRequest request
    ) {

        String feedback = geminiService.generateFeedback(
                request.getQuestion(),
                request.getAnswer()
        );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Feedback generated successfully",
                        Map.of("feedback", feedback)
                )
        );
    }
}