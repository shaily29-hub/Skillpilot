package com.skillpilot.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeAnalysisService {

    @Autowired
    private SkillExtractorService skillExtractorService;

    public Map<String, Object> analyze(String text) {

        Map<String, Object> result = new HashMap<>();

        List<String> skills = skillExtractorService.extractSkills(text);

        String email = extractEmail(text);
        String phone = extractPhone(text);

        result.put("skills", skills);
        result.put("email", email);
        result.put("phone", phone);

        return result;
    }

    private String extractEmail(String text) {

        if (text == null) return "Not Found";

        Pattern pattern = Pattern.compile(
                "[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+"
        );

        Matcher matcher = pattern.matcher(text);

        return matcher.find() ? matcher.group() : "Not Found";
    }

    private String extractPhone(String text) {

        if (text == null) return "Not Found";

        Pattern pattern = Pattern.compile(
                "\\b\\d{10}\\b"
        );

        Matcher matcher = pattern.matcher(text);

        return matcher.find() ? matcher.group() : "Not Found";
    }
}