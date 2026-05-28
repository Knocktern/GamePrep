package com.gameprep.dto;

public class AnswerResultDto {

    private boolean correct;
    private int currentHealth;
    private String correctAnswer;
    private String sessionStatus;
    private int answeredQuestions;
    private int totalQuestions;
    private GameResultDto finalResult;

    public AnswerResultDto() {
    }

    public AnswerResultDto(boolean correct, int currentHealth, String correctAnswer, String sessionStatus,
                           int answeredQuestions, int totalQuestions, GameResultDto finalResult) {
        this.correct = correct;
        this.currentHealth = currentHealth;
        this.correctAnswer = correctAnswer;
        this.sessionStatus = sessionStatus;
        this.answeredQuestions = answeredQuestions;
        this.totalQuestions = totalQuestions;
        this.finalResult = finalResult;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public int getCurrentHealth() {
        return currentHealth;
    }

    public void setCurrentHealth(int currentHealth) {
        this.currentHealth = currentHealth;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getSessionStatus() {
        return sessionStatus;
    }

    public void setSessionStatus(String sessionStatus) {
        this.sessionStatus = sessionStatus;
    }

    public int getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(int answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public GameResultDto getFinalResult() {
        return finalResult;
    }

    public void setFinalResult(GameResultDto finalResult) {
        this.finalResult = finalResult;
    }
}
