package com.gameprep.dto;

public class PlayerDto {

    private Long id;
    private String username;
    private int level;
    private int xp;

    public PlayerDto() {
    }

    public PlayerDto(Long id, String username, int level, int xp) {
        this.id = id;
        this.username = username;
        this.level = level;
        this.xp = xp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }
}
