package com.skillpilot.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class InterviewSessionResponse {

    private Long sessionId;

    private List<String> questions;

    private Integer currentQuestion;
}