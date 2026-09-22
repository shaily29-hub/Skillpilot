package com.skillpilot.backend.repository;

import com.skillpilot.backend.model.MockInterviewSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MockInterviewSessionRepository
        extends JpaRepository<MockInterviewSession, Long> {
}