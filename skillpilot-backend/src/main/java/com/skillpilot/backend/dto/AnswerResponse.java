package com.skillpilot.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnswerResponse {

    private String feedback;

    private boolean nextQuestionAvailable;
}