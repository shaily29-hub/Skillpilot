package com.skillpilot.backend.repository;

import com.skillpilot.backend.model.InterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewAnswerRepository extends JpaRepository<InterviewAnswer, Long> {

    List<InterviewAnswer> findBySessionId(Long sessionId);
}