package com.gameprep.controller;

import com.gameprep.dto.ErrorResponseDto;
import com.gameprep.dto.GameResultDto;
import com.gameprep.dto.StartGameRequestDto;
import com.gameprep.dto.StartGameResponseDto;
import com.gameprep.dto.SubmitGameRequestDto;
import com.gameprep.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final SessionService sessionService;

    public GameController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/start")
    public ResponseEntity<?> startGame(@RequestBody StartGameRequestDto request) {
        try {
            StartGameResponseDto response = sessionService.startGame(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ErrorResponseDto(ex.getMessage()));
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitGame(@RequestBody SubmitGameRequestDto request) {
        try {
            GameResultDto result = sessionService.submitGame(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ErrorResponseDto(ex.getMessage()));
        }
    }
}
