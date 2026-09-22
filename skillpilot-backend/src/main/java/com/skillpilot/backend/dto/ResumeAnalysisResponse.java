package com.skillpilot.backend.dto;

import java.util.List;
import java.util.List;
import java.util.Map;

import com.skillpilot.backend.dto.RoleMatch;

public class ResumeAnalysisResponse {

    private Long id;
    private String email;
    private String phone;
    private List<String> skills;
    private int atsScore;
    private List<String> missingSkills;
    private String bestRole;
    private Integer matchScore;
    private List<RoleMatch> topRoles;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;
    private Map<String, Integer> scoreBreakdown;
    private String resumeSummary;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getSkills() {
        return skills;
    }


    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public String getBestRole() {
        return bestRole;
    }

    public void setBestRole(String bestRole) {
        this.bestRole = bestRole;
    }

    public Integer getMatchScore() {
        return matchScore;
    }

    public void setMatchScore(Integer matchScore) {
        this.matchScore = matchScore;
    }

    public List<RoleMatch> getTopRoles() {
        return topRoles;
    }

    public void setTopRoles(List<RoleMatch> topRoles) {
        this.topRoles = topRoles;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public Map<String, Integer> getScoreBreakdown() {
        return scoreBreakdown;
    }

    public void setScoreBreakdown(Map<String, Integer> scoreBreakdown) {
        this.scoreBreakdown = scoreBreakdown;
    }

    public String getResumeSummary() {
        return resumeSummary;
    }

    public void setResumeSummary(String resumeSummary) {
        this.resumeSummary = resumeSummary;
    }
}