package com.gameprep.repository;

import com.gameprep.model.LeaderboardEntry;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, Long> {
    List<LeaderboardEntry> findAllByOrderByRankPositionAsc();
}
