package com.gameprep.dto;

public class DailyMissionDto {

    private String code;
    private String title;
    private int xpReward;

    public DailyMissionDto() {
    }

    public DailyMissionDto(String code, String title, int xpReward) {
        this.code = code;
        this.title = title;
        this.xpReward = xpReward;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }
}