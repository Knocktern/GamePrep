package com.gameprep.service;

import com.gameprep.dto.PlayerDto;
import com.gameprep.mapper.PlayerMapper;
import com.gameprep.model.Player;
import com.gameprep.repository.PlayerRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;

    public PlayerService(PlayerRepository playerRepository, PlayerMapper playerMapper) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
    }

    public List<PlayerDto> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(playerMapper::toDto)
                .toList();
    }

    public Optional<PlayerDto> getPlayerById(Long id) {
        return playerRepository.findById(id)
                .map(playerMapper::toDto);
    }

    public PlayerDto createPlayer(PlayerDto player) {
        Player entity = playerMapper.toEntity(player);
        Player saved = playerRepository.save(entity);
        return playerMapper.toDto(saved);
    }

    public PlayerDto updatePlayer(Long id, PlayerDto updated) {
        Player existing = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found"));
        existing.setUsername(updated.getUsername());
        existing.setLevel(updated.getLevel());
        existing.setXp(updated.getXp());
        Player saved = playerRepository.save(existing);
        return playerMapper.toDto(saved);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
