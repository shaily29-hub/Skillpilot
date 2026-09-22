package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScoreBreakdownService {

    public Map<String, Integer> generateBreakdown(
            List<String> skills,
            Integer atsScore
    ) {

        Map<String, Integer> breakdown = new HashMap<>();

        int skillsScore = Math.min(skills.size() * 6, 100);

        int projectsScore = 70;

        int experienceScore = 60;

        int atsCompatibility = atsScore;

        breakdown.put("skills", skillsScore);
        breakdown.put("projects", projectsScore);
        breakdown.put("experience", experienceScore);
        breakdown.put("atsCompatibility", atsCompatibility);

        return breakdown;
    }
}