package com.gameprep.dto;

public class AuthResponseDto {

    private PlayerDto player;
    private String message;
    private String token;

    public AuthResponseDto() {
    }

    public AuthResponseDto(PlayerDto player, String message, String token) {
        this.player = player;
        this.message = message;
        this.token = token;
    }

    public PlayerDto getPlayer() {
        return player;
    }

    public void setPlayer(PlayerDto player) {
        this.player = player;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
