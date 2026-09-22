package com.skillpilot.backend.service;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeSummaryService {

    public String generateSummary(
            List<String> skills,
            String bestRole
    ) {

        StringBuilder summary = new StringBuilder();

        if (bestRole.equals("Frontend Developer")) {

            summary.append(
                    "Frontend-focused developer skilled in "
            );

        } else if (bestRole.equals("Backend Developer")) {

            summary.append(
                    "Backend-focused developer experienced in "
            );

        } else if (bestRole.equals("Full Stack Developer")) {

            summary.append(
                    "Full stack developer experienced with "
            );

        } else {

            summary.append(
                    "Software developer skilled in "
            );
        }

        int limit = Math.min(skills.size(), 5);

        for (int i = 0; i < limit; i++) {

            summary.append(skills.get(i));

            if (i < limit - 1) {
                summary.append(", ");
            }
        }

        summary.append(
                " with strong career growth potential."
        );

        return summary.toString();
    }
}