package com.gameprep.dto;

public class GameResultDto {

    private Long sessionId;
    private Long playerId;
    private int totalQuestions;
    private int correctAnswers;
    private int score;
    private int xpGained;
    private int newTotalXp;
    private int newLevel;

    public GameResultDto() {
    }

    public GameResultDto(Long sessionId, Long playerId, int totalQuestions, int correctAnswers, int score, int xpGained,
                         int newTotalXp, int newLevel) {
        this.sessionId = sessionId;
        this.playerId = playerId;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.score = score;
        this.xpGained = xpGained;
        this.newTotalXp = newTotalXp;
        this.newLevel = newLevel;
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getXpGained() {
        return xpGained;
    }

    public void setXpGained(int xpGained) {
        this.xpGained = xpGained;
    }

    public int getNewTotalXp() {
        return newTotalXp;
    }

    public void setNewTotalXp(int newTotalXp) {
        this.newTotalXp = newTotalXp;
    }

    public int getNewLevel() {
        return newLevel;
    }

    public void setNewLevel(int newLevel) {
        this.newLevel = newLevel;
    }
}
