package com.gameprep.dto;

public class LeaderboardEntryDto {

    private Long id;
    private Long playerId;
    private String username;
    private int rank;
    private int totalXp;
    private int totalSessions;

    public LeaderboardEntryDto() {
    }

    public LeaderboardEntryDto(Long id, Long playerId, String username, int rank, int totalXp, int totalSessions) {
        this.id = id;
        this.playerId = playerId;
        this.username = username;
        this.rank = rank;
        this.totalXp = totalXp;
        this.totalSessions = totalSessions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getTotalXp() {
        return totalXp;
    }

    public void setTotalXp(int totalXp) {
        this.totalXp = totalXp;
    }

    public int getTotalSessions() {
        return totalSessions;
    }

    public void setTotalSessions(int totalSessions) {
        this.totalSessions = totalSessions;
    }
}
