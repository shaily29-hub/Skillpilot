package com.skillpilot.backend.controller;

import com.skillpilot.backend.model.Resume;
import com.skillpilot.backend.repository.ResumeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private ResumeRepository resumeRepository;

    // GET ALL RESUMES
    @GetMapping("/resumes")
    public ResponseEntity<?> getAllResumes() {

        List<Resume> resumes =
                resumeRepository.findAll();

        return ResponseEntity.ok(resumes);
    }
}