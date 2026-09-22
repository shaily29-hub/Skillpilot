package com.skillpilot.backend;

import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;

public class keyutil{
    public static void main(String[] args) {
        System.out.println(
                Base64.getEncoder().encodeToString(
                        Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded()
                )
        );
    }
}