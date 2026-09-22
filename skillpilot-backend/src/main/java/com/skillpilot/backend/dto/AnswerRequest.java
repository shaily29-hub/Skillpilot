package com.skillpilot.backend.dto;

import lombok.Data;

@Data
public class AnswerRequest {

    private Long sessionId;

    private String answer;
}