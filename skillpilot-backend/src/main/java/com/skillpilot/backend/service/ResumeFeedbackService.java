package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeFeedbackService {

    public List<String> generateStrengths(List<String> skills) {

        List<String> strengths = new ArrayList<>();

        String allSkills = skills.toString().toLowerCase();

        if (allSkills.contains("react")) {
            strengths.add("Strong frontend development skills");
        }

        if (allSkills.contains("javascript")) {
            strengths.add("Good JavaScript ecosystem knowledge");
        }

        if (allSkills.contains("typescript")) {
            strengths.add("Experience with TypeScript");
        }

        if (allSkills.contains("java")) {
            strengths.add("Solid programming foundation in Java");
        }

        if (allSkills.contains("git")) {
            strengths.add("Familiar with version control systems");
        }

        return strengths;
    }

    public List<String> generateWeaknesses(List<String> skills) {

        List<String> weaknesses = new ArrayList<>();

        String allSkills = skills.toString().toLowerCase();

        if (!allSkills.contains("spring")) {
            weaknesses.add("Missing backend framework experience");
        }

        if (!allSkills.contains("docker")) {
            weaknesses.add("No DevOps tools detected");
        }

        if (!allSkills.contains("aws")) {
            weaknesses.add("Cloud technologies are missing");
        }

        if (!allSkills.contains("kubernetes")) {
            weaknesses.add("Container orchestration skills missing");
        }

        return weaknesses;
    }

    public List<String> generateSuggestions(List<String> skills) {

        List<String> suggestions = new ArrayList<>();

        String allSkills = skills.toString().toLowerCase();

        if (!allSkills.contains("spring")) {
            suggestions.add(
                    "Learn Spring Boot to improve backend opportunities"
            );
        }

        if (!allSkills.contains("docker")) {
            suggestions.add(
                    "Add Docker projects to strengthen DevOps profile"
            );
        }

        if (!allSkills.contains("aws")) {
            suggestions.add(
                    "Include cloud deployment experience"
            );
        }

        if (!allSkills.contains("microservices")) {
            suggestions.add(
                    "Build microservices-based applications"
            );
        }

        if (allSkills.contains("react") && allSkills.contains("java")) {
            suggestions.add(
                    "Build full stack projects for better job matching"
            );
        }

        if (!allSkills.contains("postgresql")) {
            suggestions.add(
                    "Learn PostgreSQL for enterprise backend development"
            );
        }

        return suggestions;
    }
}