package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;
import com.skillpilot.backend.dto.RoleMatch;

@Service
public class JobMatchingService {

    private String normalize(String skill) {
        return skill
                .toLowerCase()
                .replace(".", "")
                .replace(" ", "")
                .replace("-", "")
                .trim();
    }

    private final Map<String, List<String>> jobRoles = new HashMap<>();

    public JobMatchingService() {
        jobRoles.put("Backend Developer", Arrays.asList(
                "java", "springboot", "microservices",
                "mysql", "postgresql", "docker", "aws"
        ));

        jobRoles.put("Frontend Developer", Arrays.asList(
                "html", "css", "javascript",
                "react", "typescript", "tailwind"
        ));

        jobRoles.put("Full Stack Developer", Arrays.asList(
                "java", "springboot", "react",
                "nodejs", "mongodb", "mysql"
        ));

        jobRoles.put("DevOps Engineer", Arrays.asList(
                "docker", "kubernetes", "aws", "git"
        ));
    }

    public Map<String, Object> findBestJobRole(List<String> extractedSkills) {

        System.out.println("🔥 NEW JOB MATCHING SERVICE IS RUNNING");

        Map<String, Object> result = new HashMap<>();

        if (extractedSkills == null || extractedSkills.isEmpty()) {

            result.put("bestRole", "Unknown");
            result.put("matchScore", 0);

            return result;
        }

        // STEP 1: normalize user skills
        Set<String> userSkills = new HashSet<>();

        for (String skill : extractedSkills) {

            String norm = normalize(skill);

            System.out.println("SKILL: " + skill + " -> " + norm);

            userSkills.add(norm);
        }

        String bestRole = "Unknown";
        double bestScore = 0;

        List<RoleMatch> allRoles = new ArrayList<>();
        // STEP 2: loop roles
        for (Map.Entry<String, List<String>> entry : jobRoles.entrySet()) {

            String role = entry.getKey();

            List<String> requiredSkills = entry.getValue();

            System.out.println("CHECKING ROLE: " + role);

            int matched = 0;

            // STEP 3: check skills
            for (String req : requiredSkills) {

                String normalizedReq = normalize(req);

                System.out.println("REQ RAW: " + req + " -> " + normalizedReq);

                if (userSkills.contains(normalizedReq)) {

                    matched++;

                    System.out.println("MATCH FOUND = " + normalizedReq);
                }
            }

            // STEP 4: calculate score
            double score = (matched * 100.0) / requiredSkills.size();

            score = score * (0.8 + (matched * 0.03));

            int finalScore = (int) Math.min(score, 100);

            allRoles.add(new RoleMatch(role, finalScore));

            if (score > bestScore) {
                bestScore = score;
                bestRole = role;
            }
            System.out.println("ROLE = " + role);
            System.out.println("MATCHED = " + matched);
            System.out.println("SCORE = " + score);

            // STEP 5: SAVE BEST ROLE
            if (score > bestScore) {

                bestScore = score;

                bestRole = role;
            }
        }
        allRoles.sort((a, b) -> b.getScore() - a.getScore());

        result.put("bestRole", bestRole);

        result.put("matchScore", (int) bestScore);

        result.put("topRoles", allRoles);

        return result;
    }
    public List<RoleMatch> getTopRoleMatches(List<String> extractedSkills) {

        List<RoleMatch> topRoles = new ArrayList<>();

        Set<String> userSkills = new HashSet<>();

        for (String skill : extractedSkills) {
            userSkills.add(normalize(skill));
        }

        for (Map.Entry<String, List<String>> entry : jobRoles.entrySet()) {

            String role = entry.getKey();
            List<String> requiredSkills = entry.getValue();

            int matched = 0;

            for (String req : requiredSkills) {

                if (userSkills.contains(normalize(req))) {
                    matched++;
                }
            }

            double score =
                    (matched * 100.0) / requiredSkills.size();

            score = score * (0.8 + (matched * 0.03));

            if (score > 100) {
                score = 100;
            }

            topRoles.add(
                    new RoleMatch(
                            role,
                            (int) score
                    )
            );
        }

        topRoles.sort((a, b) ->
                b.getScore() - a.getScore());

        return topRoles;
    }
}