package com.gameprep.dto;

public class StartGameRequestDto {

    private Long playerId;
    private String prepField;
    private String topic;
    private String difficulty;
    private int numberOfQuestions;

    public StartGameRequestDto() {
    }

    public StartGameRequestDto(Long playerId, String prepField, String topic, String difficulty, int numberOfQuestions) {
        this.playerId = playerId;
        this.prepField = prepField;
        this.topic = topic;
        this.difficulty = difficulty;
        this.numberOfQuestions = numberOfQuestions;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
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

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}
