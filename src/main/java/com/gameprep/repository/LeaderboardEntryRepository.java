package com.gameprep.repository;

import com.gameprep.model.LeaderboardEntry;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, Long> {
    List<LeaderboardEntry> findAllByOrderByRankPositionAsc();

    Optional<LeaderboardEntry> findByPlayerId(Long playerId);
}
