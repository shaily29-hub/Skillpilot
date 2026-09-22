package com.skillpilot.backend.dto;

import lombok.Data;

@Data
public class AnswerSubmissionRequest {

    private Long sessionId;

    private Integer questionIndex;

    private String answer;
}