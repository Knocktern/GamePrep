package com.gameprep.dto;

import java.time.LocalDateTime;

public class SessionDto {

    private Long id;
    private Long playerId;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private int score;
    private int totalQuestions;
    private int correctAnswers;

    public SessionDto() {
    }

    public SessionDto(Long id, Long playerId, LocalDateTime startedAt, LocalDateTime endedAt, int score, int totalQuestions, int correctAnswers) {
        this.id = id;
        this.playerId = playerId;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getEndedAt() {
        return endedAt;
    }

    public void setEndedAt(LocalDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}
