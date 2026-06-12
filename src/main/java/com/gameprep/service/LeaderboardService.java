package com.gameprep.service;

import com.gameprep.dto.LeaderboardEntryDto;
import com.gameprep.mapper.LeaderboardMapper;
import com.gameprep.model.LeaderboardEntry;
import com.gameprep.model.Player;
import com.gameprep.repository.LeaderboardEntryRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardService {

    private final LeaderboardEntryRepository leaderboardEntryRepository;
    private final LeaderboardMapper leaderboardMapper;

    public LeaderboardService(LeaderboardEntryRepository leaderboardEntryRepository, LeaderboardMapper leaderboardMapper) {
        this.leaderboardEntryRepository = leaderboardEntryRepository;
        this.leaderboardMapper = leaderboardMapper;
    }

    public List<LeaderboardEntryDto> getLeaderboard() {
        return leaderboardEntryRepository.findAllByOrderByRankPositionAsc().stream()
                .map(leaderboardMapper::toDto)
                .toList();
    }

    public LeaderboardEntryDto upsertEntryForPlayer(Player player, int totalXp, int totalSessions) {
        Long playerId = player.getId();
        LeaderboardEntry entry = leaderboardEntryRepository.findByPlayerId(playerId)
                .orElse(new LeaderboardEntry());
        entry.setPlayer(player);
        entry.setTotalXp(totalXp);
        entry.setTotalSessions(totalSessions);
        if (entry.getId() == null) {
            entry.setRankPosition(0);
        }
        LeaderboardEntry saved = leaderboardEntryRepository.save(entry);
        return new LeaderboardEntryDto(
            saved.getId(),
            playerId,
            player.getUsername(),
            saved.getRankPosition(),
            saved.getTotalXp(),
            saved.getTotalSessions()
        );
    }
}
