package com.gameprep.repository;

import com.gameprep.model.Player;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByUsername(String username);

    boolean existsByUsername(String username);

    Optional<Player> findByAuthToken(String authToken);
}
