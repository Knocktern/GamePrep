package com.gameprep.mapper;

import com.gameprep.dto.SessionDto;
import com.gameprep.model.Session;
import org.springframework.stereotype.Component;

@Component
public class SessionMapper {

    public SessionDto toDto(Session entity) {
        if (entity == null) {
            return null;
        }
        Long playerId = entity.getPlayer() != null ? entity.getPlayer().getId() : null;
        return new SessionDto(
                entity.getId(),
                playerId,
                entity.getStartedAt(),
                entity.getEndedAt(),
                entity.getScore(),
                entity.getTotalQuestions(),
                entity.getCorrectAnswers()
        );
    }
}
