package com.gameprep.dto;

public class StartGameRequestDto {

    private Long playerId;
    private String difficulty;
    private int numberOfQuestions;

    public StartGameRequestDto() {
    }

    public StartGameRequestDto(Long playerId, String difficulty, int numberOfQuestions) {
        this.playerId = playerId;
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}
