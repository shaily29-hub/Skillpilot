package com.skillpilot.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class MockInterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    @Column(columnDefinition = "TEXT")
    private String questionsJson;

    private Integer currentQuestion;

    private String status;
}