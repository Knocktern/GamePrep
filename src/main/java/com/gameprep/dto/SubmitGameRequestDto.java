package com.gameprep.dto;

import java.util.List;

public class SubmitGameRequestDto {

    private Long sessionId;
    private Long playerId;
    private List<SubmitAnswerDto> answers;

    public SubmitGameRequestDto() {
    }

    public SubmitGameRequestDto(Long sessionId, Long playerId, List<SubmitAnswerDto> answers) {
        this.sessionId = sessionId;
        this.playerId = playerId;
        this.answers = answers;
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

    public List<SubmitAnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SubmitAnswerDto> answers) {
        this.answers = answers;
    }
}
