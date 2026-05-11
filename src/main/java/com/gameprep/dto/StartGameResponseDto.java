package com.gameprep.dto;

import java.util.List;

public class StartGameResponseDto {

    private Long sessionId;
    private Long playerId;
    private List<GameQuestionDto> questions;

    public StartGameResponseDto() {
    }

    public StartGameResponseDto(Long sessionId, Long playerId, List<GameQuestionDto> questions) {
        this.sessionId = sessionId;
        this.playerId = playerId;
        this.questions = questions;
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
}
