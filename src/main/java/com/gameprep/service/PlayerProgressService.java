package com.gameprep.service;

import com.gameprep.dto.PlayerProgressDto;
import com.gameprep.model.Player;
import com.gameprep.model.PlayerProgress;
import com.gameprep.repository.PlayerProgressRepository;
import com.gameprep.util.GameMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public class PlayerProgressService {

    private final PlayerProgressRepository playerProgressRepository;

    public PlayerProgressService(PlayerProgressRepository playerProgressRepository) {
        this.playerProgressRepository = playerProgressRepository;
    }

    public List<PlayerProgressDto> getProgressForPlayer(Player player) {
        ensureStarterUnlocks(player);
        return playerProgressRepository.findByPlayerId(player.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    public boolean isTopicUnlocked(Player player, String prepField, String topic) {
        ensureStarterUnlocks(player);
        return playerProgressRepository.findByPlayerIdAndPrepFieldAndTopic(player.getId(), prepField, topic)
                .isPresent();
    }

    public void markClearedAndUnlockNext(Player player, String prepField, String topic) {
        PlayerProgress current = playerProgressRepository
                .findByPlayerIdAndPrepFieldAndTopic(player.getId(), prepField, topic)
                .orElseGet(() -> new PlayerProgress(player, prepField, topic, true));
        current.setCleared(true);
        playerProgressRepository.save(current);

        String nextTopic = GameMap.getNextTopic(prepField, topic);
        if (nextTopic == null) {
            return;
        }
        playerProgressRepository.findByPlayerIdAndPrepFieldAndTopic(player.getId(), prepField, nextTopic)
                .orElseGet(() -> playerProgressRepository.save(
                        new PlayerProgress(player, prepField, nextTopic, false)));
    }

    public void ensureStarterUnlocks(Player player) {
        List<PlayerProgress> existing = playerProgressRepository.findByPlayerId(player.getId());
        Set<String> keys = new HashSet<>();
        for (PlayerProgress progress : existing) {
            keys.add(key(progress.getPrepField(), progress.getTopic()));
        }
        for (String prepField : GameMap.getPrepFields()) {
            for (String topic : GameMap.getPath(prepField)) {
                String candidateKey = key(prepField, topic);
                if (keys.contains(candidateKey)) {
                    continue;
                }
                playerProgressRepository.save(new PlayerProgress(player, prepField, topic, false));
                keys.add(candidateKey);
            }
        }
    }

    private PlayerProgressDto toDto(PlayerProgress entity) {
        return new PlayerProgressDto(entity.getPrepField(), entity.getTopic(), entity.isCleared());
    }

    private String key(String prepField, String topic) {
        return String.format("%s|%s", prepField, topic);
    }
}
