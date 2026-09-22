package com.skillpilot.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private GeminiService geminiService;

    public List<String> generateQuestions(List<String> skills, String role) {

        String skillText = String.join(", ", skills);

        String response = geminiService.generateInterviewQuestions(
                skillText,
                role,
                5
        );      

        // Convert AI response → List<String>
        return Arrays.stream(response.split("\n"))
                .filter(q -> !q.trim().isEmpty())
                .toList();
    }

    }

