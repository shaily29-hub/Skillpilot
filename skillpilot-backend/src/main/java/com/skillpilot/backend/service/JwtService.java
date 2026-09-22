package com.skillpilot.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(secret)
        );
    }

    public SecretKey getSigningKey() {
        return getKey();
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}