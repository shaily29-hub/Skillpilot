package com.skillpilot.backend.repository;

import com.skillpilot.backend.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    List<Resume> findByUserEmail(String userEmail);
}