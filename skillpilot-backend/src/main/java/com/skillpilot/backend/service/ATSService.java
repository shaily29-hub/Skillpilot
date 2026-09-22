package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ATSService {

    // Skill weights (ATS scoring logic)
    private final Map<String, Integer> skillWeights = new HashMap<>();

    public ATSService() {

        // Backend (high weight)
        skillWeights.put("Java", 10);
        skillWeights.put("Spring Boot", 15);
        skillWeights.put("Node.js", 10);
        skillWeights.put("Express.js", 8);
        skillWeights.put("Microservices", 12);

        // Frontend
        skillWeights.put("React", 10);
        skillWeights.put("JavaScript", 8);
        skillWeights.put("TypeScript", 10);
        skillWeights.put("HTML", 4);
        skillWeights.put("CSS", 4);
        skillWeights.put("Tailwind", 6);

        // Database
        skillWeights.put("MongoDB", 10);
        skillWeights.put("MySQL", 8);
        skillWeights.put("PostgreSQL", 10);

        // DevOps
        skillWeights.put("Docker", 12);
        skillWeights.put("Kubernetes", 15);
        skillWeights.put("AWS", 12);

        // Tools
        skillWeights.put("Git", 5);
        skillWeights.put("Redux", 6);
    }

    public Map<String, Object> calculateATSScore(List<String> extractedSkills) {

        Map<String, Object> result = new HashMap<>();

        if (extractedSkills == null || extractedSkills.isEmpty()) {
            result.put("atsScore", 0);
            result.put("missingSkills", new ArrayList<>());
            return result;
        }

        // Normalize extracted skills (IMPORTANT FIX)
        Set<String> normalizedSkills = new HashSet<>();

        for (String skill : extractedSkills) {
            if (skill != null) {
                normalizedSkills.add(skill.trim().toLowerCase());
            }
        }

        int totalPossibleScore = 0;
        int obtainedScore = 0;

        List<String> missingSkills = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : skillWeights.entrySet()) {

            String skill = entry.getKey();
            int weight = entry.getValue();

            totalPossibleScore += weight;

            if (normalizedSkills.contains(skill.toLowerCase())) {
                obtainedScore += weight;
            } else {
                missingSkills.add(skill);
            }
        }

        int finalScore = (int) ((obtainedScore * 100.0) / totalPossibleScore);

        result.put("atsScore", finalScore);
        result.put("missingSkills", missingSkills);

        return result;
    }
}