package com.gameprep.controller;

import com.gameprep.dto.ErrorResponseDto;
import com.gameprep.dto.PlayerDto;
import com.gameprep.dto.PlayerProgressDto;
import com.gameprep.model.Player;
import com.gameprep.service.AuthService;
import com.gameprep.service.PlayerProgressService;
import com.gameprep.service.PlayerService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;
    private final AuthService authService;
    private final PlayerProgressService playerProgressService;

    public PlayerController(PlayerService playerService, AuthService authService, PlayerProgressService playerProgressService) {
        this.playerService = playerService;
        this.authService = authService;
        this.playerProgressService = playerProgressService;
    }

    @GetMapping
    public List<PlayerDto> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/me/progress")
    public ResponseEntity<?> getMyProgress(@RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            Player player = authService.requirePlayer(resolveToken(authorization));
            List<PlayerProgressDto> progress = playerProgressService.getProgressForPlayer(player);
            return ResponseEntity.ok(progress);
        } catch (RuntimeException ex) {
            return errorResponse(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDto> getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PlayerDto> createPlayer(@RequestBody PlayerDto player) {
        PlayerDto created = playerService.createPlayer(player);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlayerDto> updatePlayer(@PathVariable Long id, @RequestBody PlayerDto updated) {
        try {
            PlayerDto saved = playerService.updatePlayer(id, updated);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }

    private String resolveToken(String authorization) {
        if (authorization == null || authorization.isBlank()) {
            return "";
        }
        if (authorization.startsWith("Bearer ")) {
            return authorization.substring("Bearer ".length()).trim();
        }
        return authorization.trim();
    }

    private ResponseEntity<ErrorResponseDto> errorResponse(String message) {
        if (message != null && message.toLowerCase().contains("token")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponseDto(message));
        }
        return ResponseEntity.badRequest().body(new ErrorResponseDto(message));
    }
}
