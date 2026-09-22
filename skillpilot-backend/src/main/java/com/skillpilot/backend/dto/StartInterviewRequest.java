package com.skillpilot.backend.dto;

import lombok.Data;

@Data
public class StartInterviewRequest {

    private Long resumeId;

    private String role;

    private String skills;

    private Integer questionCount;
}