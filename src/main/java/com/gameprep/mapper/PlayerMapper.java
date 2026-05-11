package com.gameprep.mapper;

import com.gameprep.dto.PlayerDto;
import com.gameprep.model.Player;
import org.springframework.stereotype.Component;

@Component
public class PlayerMapper {

    public PlayerDto toDto(Player entity) {
        if (entity == null) {
            return null;
        }
        return new PlayerDto(entity.getId(), entity.getUsername(), entity.getLevel(), entity.getXp());
    }

    public Player toEntity(PlayerDto dto) {
        if (dto == null) {
            return null;
        }
        Player player = new Player();
        player.setId(dto.getId());
        player.setUsername(dto.getUsername());
        player.setLevel(dto.getLevel());
        player.setXp(dto.getXp());
        return player;
    }
}
