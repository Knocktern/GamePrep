package com.gameprep.repository;

import com.gameprep.model.Session;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByPlayerId(Long playerId);

    long countByPlayerId(Long playerId);
}
