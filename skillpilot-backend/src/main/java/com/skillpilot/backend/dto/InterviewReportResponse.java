package com.skillpilot.backend.dto;

import com.skillpilot.backend.model.InterviewAnswer;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InterviewReportResponse {

    private Integer totalQuestions;

    private Integer totalScore;

    private Double averageScore;

    private List<InterviewAnswer> answers;
}