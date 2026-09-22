package com.skillpilot.backend.service;

import com.skillpilot.backend.dto.JDMatchResponse;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JDMatchingService {

    private final List<String> knownSkills = Arrays.asList(
            "java",
            "spring boot",
            "microservices",
            "react",
            "javascript",
            "typescript",
            "html",
            "css",
            "tailwind",
            "node.js",
            "express.js",
            "mysql",
            "postgresql",
            "mongodb",
            "docker",
            "kubernetes",
            "aws",
            "git",
            "python"
    );

    private final Map<String, List<String>> roleSkills = new HashMap<>();

    public JDMatchingService() {

        roleSkills.put(
                "backend developer",
                Arrays.asList(
                        "java",
                        "spring boot",
                        "microservices",
                        "mysql",
                        "postgresql",
                        "docker",
                        "aws"
                )
        );

        roleSkills.put(
                "frontend developer",
                Arrays.asList(
                        "html",
                        "css",
                        "javascript",
                        "react",
                        "typescript",
                        "tailwind"
                )
        );

        roleSkills.put(
                "full stack developer",
                Arrays.asList(
                        "java",
                        "spring boot",
                        "react",
                        "javascript",
                        "mysql",
                        "postgresql",
                        "node.js"
                )
        );

        roleSkills.put(
                "devops engineer",
                Arrays.asList(
                        "docker",
                        "kubernetes",
                        "aws",
                        "git"
                )
        );
    }

    private String normalize(String text) {

        return text
                .toLowerCase()
                .replace(".", "")
                .replace("-", "")
                .trim();
    }

    public JDMatchResponse matchResumeWithJD(
            List<String> resumeSkills,
            String jobDescription
    ) {

        System.out.println("========== JD MATCH ==========");
        System.out.println("RESUME SKILLS: " + resumeSkills);
        System.out.println("JOB DESCRIPTION: " + jobDescription);

        Set<String> normalizedResumeSkills =
                new HashSet<>();

        for (String skill : resumeSkills) {

            normalizedResumeSkills.add(
                    normalize(skill)
            );
        }

        List<String> jdSkills = new ArrayList<>();

        String lowerJD =
                jobDescription.toLowerCase().trim();

        /*
         * STEP 1:
         * Check if user entered a known job role.
         */

        for (Map.Entry<String, List<String>> entry :
                roleSkills.entrySet()) {

            if (lowerJD.equals(entry.getKey())) {

                jdSkills.addAll(entry.getValue());
                break;
            }
        }

        /*
         * STEP 2:
         * If it is not a direct role name,
         * extract technical skills from the JD.
         */

        if (jdSkills.isEmpty()) {

            for (String skill : knownSkills) {

                if (lowerJD.contains(
                        skill.toLowerCase()
                )) {

                    jdSkills.add(skill);
                }
            }
        }

        /*
         * STEP 3:
         * Compare resume skills with JD skills.
         */

        List<String> matchedSkills =
                new ArrayList<>();

        List<String> missingSkills =
                new ArrayList<>();

        int matched = 0;

        for (String jdSkill : jdSkills) {

            if (normalizedResumeSkills.contains(
                    normalize(jdSkill)
            )) {

                matchedSkills.add(jdSkill);
                matched++;

            } else {

                missingSkills.add(jdSkill);
            }
        }

        /*
         * STEP 4:
         * Calculate match percentage.
         */

        int score = 0;

        if (!jdSkills.isEmpty()) {

            score =
                    (matched * 100)
                            / jdSkills.size();
        }

        /*
         * STEP 5:
         * Generate recommendation.
         */

        String recommendation;

        if (score >= 85) {

            recommendation =
                    "Excellent match for this role";

        } else if (score >= 70) {

            recommendation =
                    "Good match with minor skill gaps";

        } else if (score >= 50) {

            recommendation =
                    "Moderate match, improvement needed";

        } else {

            recommendation =
                    "Low match, add more relevant skills";
        }

        JDMatchResponse response =
                new JDMatchResponse();

        response.setMatchScore(score);

        response.setMatchedSkills(
                matchedSkills
        );

        response.setMissingSkills(
                missingSkills
        );

        response.setRecommendation(
                recommendation
        );

        return response;
    }
}