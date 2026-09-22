package com.skillpilot.backend.controller;

import com.skillpilot.backend.dto.*;
import com.skillpilot.backend.model.Resume;
import com.skillpilot.backend.repository.ResumeRepository;
import com.skillpilot.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    @Autowired private ResumeRepository resumeRepository;
    @Autowired private ResumeParsingService resumeParsingService;
    @Autowired private CloudinaryService cloudinaryService;
    @Autowired private ResumeAnalysisService resumeAnalysisService;
    @Autowired private ATSService atsService;
    @Autowired private JobMatchingService jobMatchingService;
    @Autowired private ResumeFeedbackService resumeFeedbackService;
    @Autowired private ScoreBreakdownService scoreBreakdownService;
    @Autowired private ResumeSummaryService resumeSummaryService;
    @Autowired private PdfReportService pdfReportService;
    @Autowired private JDMatchingService jdMatchingService;

    // =========================
    // UPLOAD RESUME
    // =========================
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<Map<String, Object>>> uploadResume(
            @RequestParam("file") MultipartFile file
    ) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        String extractedText = resumeParsingService.extractText(file);

        String fileUrl;
        try {
            fileUrl = cloudinaryService.uploadFile(file);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload resume", e);
        }

        Resume resume = new Resume();
        resume.setExtractedText(extractedText);
        resume.setFileUrl(fileUrl);
        resume.setStatus("PROCESSED");
        resume.setUserEmail(email);
        resume.setCreatedAt(LocalDateTime.now());

        Resume savedResume = resumeRepository.save(resume);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Resume uploaded successfully",
                        Map.of(
                                "resumeId", savedResume.getId(),
                                "status", savedResume.getStatus(),
                                "fileUrl", savedResume.getFileUrl()
                        )
                )
        );
    }

    // =========================
    // ANALYZE RESUME
    // =========================
    @GetMapping("/{id}/analyze")
    public ResponseEntity<?> analyzeResume(@PathVariable Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getUserEmail().equals(email)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        Map<String, Object> analysis =
                resumeAnalysisService.analyze(resume.getExtractedText());

        List<String> skills = (List<String>) analysis.get("skills");

        Map<String, Object> atsResult =
                atsService.calculateATSScore(skills);

        Map<String, Object> jobMatch =
                jobMatchingService.findBestJobRole(skills);

        List<String> strengths =
                resumeFeedbackService.generateStrengths(skills);

        List<String> weaknesses =
                resumeFeedbackService.generateWeaknesses(skills);

        List<String> suggestions =
                resumeFeedbackService.generateSuggestions(skills);

        Map<String, Integer> scoreBreakdown =
                scoreBreakdownService.generateBreakdown(
                        skills,
                        (Integer) atsResult.get("atsScore")
                );

        String summary =
                resumeSummaryService.generateSummary(
                        skills,
                        (String) jobMatch.get("bestRole")
                );

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();

        response.setId(resume.getId());
        response.setEmail((String) analysis.get("email"));
        response.setPhone((String) analysis.get("phone"));
        response.setSkills(skills);
        response.setAtsScore((Integer) atsResult.get("atsScore"));
        response.setMissingSkills((List<String>) atsResult.get("missingSkills"));
        response.setBestRole((String) jobMatch.get("bestRole"));
        response.setMatchScore((Integer) jobMatch.get("matchScore"));
        response.setTopRoles((List<RoleMatch>) jobMatch.get("topRoles"));
        response.setStrengths(strengths);
        response.setWeaknesses(weaknesses);
        response.setSuggestions(suggestions);
        response.setScoreBreakdown(scoreBreakdown);
        response.setResumeSummary(summary);

        return ResponseEntity.ok(response);
    }

    // =========================
    // REPORT
    // =========================
    @GetMapping("/{id}/report")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long id) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        String role = SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        boolean isAdmin = role.equals("ROLE_ADMIN");

        if (!isAdmin && !resume.getUserEmail().equals(email)) {
            return ResponseEntity.status(403).build();
        }

        Map<String, Object> analysis =
                resumeAnalysisService.analyze(resume.getExtractedText());

        List<String> skills = (List<String>) analysis.get("skills");

        Map<String, Object> atsResult =
                atsService.calculateATSScore(skills);

        Map<String, Object> jobMatch =
                jobMatchingService.findBestJobRole(skills);

        List<RoleMatch> topRoles =
                jobMatchingService.getTopRoleMatches(skills);

        List<String> strengths =
                resumeFeedbackService.generateStrengths(skills);

        List<String> weaknesses =
                resumeFeedbackService.generateWeaknesses(skills);

        List<String> suggestions =
                resumeFeedbackService.generateSuggestions(skills);

        Map<String, Integer> scoreBreakdown =
                scoreBreakdownService.generateBreakdown(
                        skills,
                        (Integer) atsResult.get("atsScore")
                );

        String summary =
                resumeSummaryService.generateSummary(
                        skills,
                        (String) jobMatch.get("bestRole")
                );

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();

        response.setId(resume.getId());
        response.setEmail((String) analysis.get("email"));
        response.setPhone((String) analysis.get("phone"));
        response.setSkills(skills);
        response.setAtsScore((Integer) atsResult.get("atsScore"));
        response.setMissingSkills((List<String>) atsResult.get("missingSkills"));
        response.setBestRole((String) jobMatch.get("bestRole"));
        response.setMatchScore((Integer) jobMatch.get("matchScore"));
        response.setTopRoles(topRoles);
        response.setStrengths(strengths);
        response.setWeaknesses(weaknesses);
        response.setSuggestions(suggestions);
        response.setScoreBreakdown(scoreBreakdown);
        response.setResumeSummary(summary);

        byte[] pdf = pdfReportService.generatePdfReport(response);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=resume-report.pdf")
                .header("Content-Type", "application/pdf")
                .body(pdf);
    }

    // =========================
    // JD MATCH
    // =========================
    @PostMapping("/match-jd")
    public ResponseEntity<?> matchResumeWithJD(
            @RequestBody JDMatchRequest request
    ) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        String role = SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities()
                .iterator()
                .next()
                .getAuthority();

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        boolean isAdmin = role.equals("ROLE_ADMIN");

        if (!isAdmin && !resume.getUserEmail().equals(email)) {
            return ResponseEntity.status(403).body("Access Denied");
        }

        Map<String, Object> analysis =
                resumeAnalysisService.analyze(resume.getExtractedText());

        List<String> resumeSkills =
                (List<String>) analysis.get("skills");

        JDMatchResponse response =
                jdMatchingService.matchResumeWithJD(
                        resumeSkills,
                        request.getJobDescription()
                );

        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-resumes")
    public ResponseEntity<?> getMyResumes() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        List<Resume> resumes =
                resumeRepository.findByUserEmail(email);

        return ResponseEntity.ok(resumes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(
            @PathVariable Long id
    ) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Resume resume = resumeRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Resume not found"
                        )
                );

        if (!resume.getUserEmail().equals(email)) {
            return ResponseEntity
                    .status(403)
                    .body("Access Denied");
        }

        resumeRepository.delete(resume);

        return ResponseEntity.ok(
                "Resume deleted successfully"
        );
    }
}
