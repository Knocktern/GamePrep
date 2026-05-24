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
    private int currentHealth;
    private String status;
    private String prepField;
    private String topic;
    private int answeredQuestions;

    public SessionDto() {
    }

    public SessionDto(Long id, Long playerId, LocalDateTime startedAt, LocalDateTime endedAt, int score,
                      int totalQuestions, int correctAnswers, int currentHealth, String status, String prepField,
                      String topic, int answeredQuestions) {
        this.id = id;
        this.playerId = playerId;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.currentHealth = currentHealth;
        this.status = status;
        this.prepField = prepField;
        this.topic = topic;
        this.answeredQuestions = answeredQuestions;
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

    public int getCurrentHealth() {
        return currentHealth;
    }

    public void setCurrentHealth(int currentHealth) {
        this.currentHealth = currentHealth;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPrepField() {
        return prepField;
    }

    public void setPrepField(String prepField) {
        this.prepField = prepField;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public int getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(int answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }
}
