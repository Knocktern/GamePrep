package com.gameprep.dto;

public class PlayerProgressDto {

    private String prepField;
    private String topic;
    private boolean cleared;

    public PlayerProgressDto() {
    }

    public PlayerProgressDto(String prepField, String topic, boolean cleared) {
        this.prepField = prepField;
        this.topic = topic;
        this.cleared = cleared;
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

    public boolean isCleared() {
        return cleared;
    }

    public void setCleared(boolean cleared) {
        this.cleared = cleared;
    }
}
