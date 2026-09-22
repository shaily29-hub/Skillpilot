package com.skillpilot.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionResponse {

    private Integer questionNumber;

    private String question;
}
