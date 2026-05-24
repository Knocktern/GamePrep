package com.gameprep.dto;

public class SubmitSingleAnswerDto {

    private Long sessionId;
    private Long questionId;
    private String answer;

    public SubmitSingleAnswerDto() {
    }

    public SubmitSingleAnswerDto(Long sessionId, Long questionId, String answer) {
        this.sessionId = sessionId;
        this.questionId = questionId;
        this.answer = answer;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
