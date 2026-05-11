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
        LeaderboardEntry entry = leaderboardEntryRepository.findAll().stream()
                .filter(existing -> player.getId() != null
                        && existing.getPlayer() != null
                        && player.getId().equals(existing.getPlayer().getId()))
                .findFirst()
                .orElse(new LeaderboardEntry());
        entry.setPlayer(player);
        entry.setTotalXp(totalXp);
        entry.setTotalSessions(totalSessions);
        if (entry.getId() == null) {
            entry.setRankPosition(0);
        }
        return leaderboardMapper.toDto(leaderboardEntryRepository.save(entry));
    }
}
