package com.gameprep.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "player_progress",
       uniqueConstraints = @UniqueConstraint(columnNames = {"player_id", "prep_field", "topic"}))
public class PlayerProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(name = "prep_field", length = 50, nullable = false)
    private String prepField;

    @Column(length = 80, nullable = false)
    private String topic;

    @Column(nullable = false)
    private boolean cleared;

    public PlayerProgress() {
    }

    public PlayerProgress(Player player, String prepField, String topic, boolean cleared) {
        this.player = player;
        this.prepField = prepField;
        this.topic = topic;
        this.cleared = cleared;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
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
