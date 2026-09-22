package com.skillpilot.backend.controller;

import com.skillpilot.backend.dto.ApiResponse;
import com.skillpilot.backend.dto.LoginRequest;
import com.skillpilot.backend.dto.RegisterRequest;
import com.skillpilot.backend.model.User;
import com.skillpilot.backend.repository.UserRepository;
import com.skillpilot.backend.service.JwtService;
import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                encoder.encode(
                        request.getPassword()
                )
        );

        user.setRole("USER");
        userRepository.save(user);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User registered successfully",
                        null
                )
        );
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {

            return ResponseEntity.badRequest()
                    .body("Invalid email");
        }

        boolean valid =
                encoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!valid) {

            return ResponseEntity.badRequest()
                    .body("Invalid password");
        }

        String token = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .signWith(jwtService.getSigningKey())
                .compact();

        Map<String, String> response =
                new HashMap<>();

        response.put("token", token);

        response.put("email", user.getEmail());

        response.put("name", user.getName());

        response.put("role", user.getRole());
        return ResponseEntity.ok(response);
    }
}