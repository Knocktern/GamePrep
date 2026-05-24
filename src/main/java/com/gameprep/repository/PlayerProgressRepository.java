package com.gameprep.repository;

import com.gameprep.model.PlayerProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerProgressRepository extends JpaRepository<PlayerProgress, Long> {
    List<PlayerProgress> findByPlayerId(Long playerId);

    Optional<PlayerProgress> findByPlayerIdAndPrepFieldAndTopic(Long playerId, String prepField, String topic);
}
