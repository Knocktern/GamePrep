package com.gameprep.controller;

import com.gameprep.dto.SessionDto;
import com.gameprep.service.SessionService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/start")
    public ResponseEntity<SessionDto> startSession(@RequestBody SessionDto request) {
        try {
            SessionDto started = sessionService.startSession(request.getPlayerId(), request.getTotalQuestions());
            return ResponseEntity.status(HttpStatus.CREATED).body(started);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/end")
    public ResponseEntity<SessionDto> endSession(@PathVariable Long id, @RequestBody SessionDto request) {
        try {
            SessionDto ended = sessionService.endSession(id, request.getScore(), request.getCorrectAnswers());
            return ResponseEntity.ok(ended);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/player/{playerId}")
    public List<SessionDto> getSessionsForPlayer(@PathVariable Long playerId) {
        return sessionService.getSessionsForPlayer(playerId);
    }
}
