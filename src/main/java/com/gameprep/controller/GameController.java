package com.gameprep.controller;

import com.gameprep.dto.ErrorResponseDto;
import com.gameprep.dto.GameResultDto;
import com.gameprep.dto.StartGameRequestDto;
import com.gameprep.dto.StartGameResponseDto;
import com.gameprep.dto.SubmitGameRequestDto;
import com.gameprep.model.Player;
import com.gameprep.service.AuthService;
import com.gameprep.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final SessionService sessionService;
    private final AuthService authService;

    public GameController(SessionService sessionService, AuthService authService) {
        this.sessionService = sessionService;
        this.authService = authService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestHeader(value = "Authorization", required = false) String authorization,
                                       @RequestBody StartGameRequestDto request) {
        try {
            Player player = authService.requirePlayer(resolveToken(authorization));
            request.setPlayerId(player.getId());
            StartGameResponseDto response = sessionService.startGame(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException ex) {
            return errorResponse(ex.getMessage());
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitGame(@RequestHeader(value = "Authorization", required = false) String authorization,
                                        @RequestBody SubmitGameRequestDto request) {
        try {
            Player player = authService.requirePlayer(resolveToken(authorization));
            request.setPlayerId(player.getId());
            GameResultDto result = sessionService.submitGame(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException ex) {
            return errorResponse(ex.getMessage());
        }
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
