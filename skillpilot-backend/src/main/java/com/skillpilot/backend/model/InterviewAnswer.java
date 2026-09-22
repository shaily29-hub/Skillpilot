package com.skillpilot.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class InterviewAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;

    @Column(length = 2000)
    private String question;

    @Column(length = 2000)
    private String answer;

    @Column(length = 5000)
    private String feedback;

    private Integer score;
}