package com.gameprep.dto;

import java.util.List;

public class StartGameResponseDto {

    private Long sessionId;
    private Long playerId;
    private List<GameQuestionDto> questions;
    private int currentHealth;
    private int maxHealth;
    private String status;
    private String prepField;
    private String topic;
    private String difficulty;

    public StartGameResponseDto() {
    }

    public StartGameResponseDto(Long sessionId, Long playerId, List<GameQuestionDto> questions,
                                int currentHealth, int maxHealth, String status) {
        this.sessionId = sessionId;
        this.playerId = playerId;
        this.questions = questions;
        this.currentHealth = currentHealth;
        this.maxHealth = maxHealth;
        this.status = status;
    }

    public StartGameResponseDto(Long sessionId, Long playerId, List<GameQuestionDto> questions,
                                int currentHealth, int maxHealth, String status,
                                String prepField, String topic, String difficulty) {
        this(sessionId, playerId, questions, currentHealth, maxHealth, status);
        this.prepField = prepField;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public List<GameQuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<GameQuestionDto> questions) {
        this.questions = questions;
    }

    public int getCurrentHealth() {
        return currentHealth;
    }

    public void setCurrentHealth(int currentHealth) {
        this.currentHealth = currentHealth;
    }

    public int getMaxHealth() {
        return maxHealth;
    }

    public void setMaxHealth(int maxHealth) {
        this.maxHealth = maxHealth;
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

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
