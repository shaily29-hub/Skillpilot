package com.skillpilot.backend.dto;

import java.util.List;

public class InterviewResponse {

    private List<String> questions;

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }
}