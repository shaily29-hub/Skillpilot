package com.skillpilot.backend.dto;

public class InterviewRequest {

    private Long resumeId;
    private String role;

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}