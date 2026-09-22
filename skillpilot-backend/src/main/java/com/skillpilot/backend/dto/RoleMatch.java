package com.skillpilot.backend.dto;

public class RoleMatch {

    private String role;
    private int score;

    public RoleMatch() {
    }

    public RoleMatch(String role, int score) {
        this.role = role;
        this.score = score;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}