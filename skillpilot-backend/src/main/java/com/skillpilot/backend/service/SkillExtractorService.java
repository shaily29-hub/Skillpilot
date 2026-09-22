package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class SkillExtractorService {

    private final Map<String, List<String>> skillDictionary = new HashMap<>();

    public SkillExtractorService() {

        skillDictionary.put("Java", Arrays.asList("java", "core java"));
        skillDictionary.put("Python", Arrays.asList("python", "py"));
        skillDictionary.put("JavaScript", Arrays.asList("javascript", "js", "es6"));
        skillDictionary.put("React", Arrays.asList("react", "reactjs", "react.js"));
        skillDictionary.put("Node.js", Arrays.asList("node", "nodejs", "node.js"));
        skillDictionary.put("Express.js", Arrays.asList("express", "expressjs"));
        skillDictionary.put("MongoDB", Arrays.asList("mongodb", "mongo"));
        skillDictionary.put("MySQL", Arrays.asList("mysql"));
        skillDictionary.put("PostgreSQL", Arrays.asList("postgresql", "postgres"));
        skillDictionary.put("Spring Boot", Arrays.asList("spring boot", "springboot"));
        skillDictionary.put("Docker", Arrays.asList("docker"));
        skillDictionary.put("AWS", Arrays.asList("aws", "amazon web services"));
        skillDictionary.put("Kubernetes", Arrays.asList("kubernetes", "k8s"));
        skillDictionary.put("HTML", Arrays.asList("html", "html5"));
        skillDictionary.put("CSS", Arrays.asList("css", "css3"));
        skillDictionary.put("Tailwind", Arrays.asList("tailwind", "tailwind css"));
        skillDictionary.put("Git", Arrays.asList("git", "github"));
        skillDictionary.put("TypeScript", Arrays.asList("typescript", "ts"));
        skillDictionary.put("Redux", Arrays.asList("redux", "redux toolkit"));
    }

    public List<String> extractSkills(String text) {

        if (text == null) return Collections.emptyList();

        String normalizedText = text.toLowerCase();
        List<String> detectedSkills = new ArrayList<>();

        for (Map.Entry<String, List<String>> entry : skillDictionary.entrySet()) {

            for (String keyword : entry.getValue()) {

                if (normalizedText.contains(keyword.toLowerCase())) {
                    detectedSkills.add(entry.getKey());
                    break;
                }
            }
        }

        return detectedSkills;
    }
}