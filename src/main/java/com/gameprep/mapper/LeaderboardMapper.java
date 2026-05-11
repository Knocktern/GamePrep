package com.gameprep.mapper;

import com.gameprep.dto.LeaderboardEntryDto;
import com.gameprep.model.LeaderboardEntry;
import com.gameprep.model.Player;
import org.springframework.stereotype.Component;

@Component
public class LeaderboardMapper {

    public LeaderboardEntryDto toDto(LeaderboardEntry entity) {
        if (entity == null) {
            return null;
        }
        Player player = entity.getPlayer();
        Long playerId = player != null ? player.getId() : null;
        String username = player != null ? player.getUsername() : null;
        return new LeaderboardEntryDto(
                entity.getId(),
                playerId,
                username,
            entity.getRankPosition(),
                entity.getTotalXp(),
                entity.getTotalSessions()
        );
    }
}
