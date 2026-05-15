package com.gameprep.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gameprep.dto.GameQuestionDto;
import com.gameprep.dto.GameResultDto;
import com.gameprep.dto.SessionDto;
import com.gameprep.dto.StartGameRequestDto;
import com.gameprep.dto.StartGameResponseDto;
import com.gameprep.dto.SubmitAnswerDto;
import com.gameprep.dto.SubmitGameRequestDto;
import com.gameprep.mapper.SessionMapper;
import com.gameprep.model.Player;
import com.gameprep.model.Question;
import com.gameprep.model.Session;
import com.gameprep.repository.PlayerRepository;
import com.gameprep.repository.QuestionRepository;
import com.gameprep.repository.SessionRepository;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final PlayerRepository playerRepository;
    private final SessionMapper sessionMapper;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final LeaderboardService leaderboardService;
    private final ObjectMapper objectMapper;

    public SessionService(SessionRepository sessionRepository,
                          PlayerRepository playerRepository,
                          SessionMapper sessionMapper,
                          QuestionService questionService,
                          QuestionRepository questionRepository,
                          LeaderboardService leaderboardService,
                          ObjectMapper objectMapper) {
        this.sessionRepository = sessionRepository;
        this.playerRepository = playerRepository;
        this.sessionMapper = sessionMapper;
        this.questionService = questionService;
        this.questionRepository = questionRepository;
        this.leaderboardService = leaderboardService;
        this.objectMapper = objectMapper;
    }

    public SessionDto startSession(Long playerId, int totalQuestions) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("Player not found"));
        Session session = new Session();
        session.setPlayer(player);
        session.setStartedAt(LocalDateTime.now());
        session.setScore(0);
        session.setCorrectAnswers(0);
        session.setTotalQuestions(totalQuestions);
        Session saved = sessionRepository.save(session);
        return sessionMapper.toDto(saved);
    }

    public SessionDto endSession(Long sessionId, int score, int correctAnswers) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setEndedAt(LocalDateTime.now());
        session.setScore(score);
        session.setCorrectAnswers(correctAnswers);
        Session saved = sessionRepository.save(session);
        return sessionMapper.toDto(saved);
    }

    public List<SessionDto> getSessionsForPlayer(Long playerId) {
        return sessionRepository.findByPlayerId(playerId).stream()
                .map(sessionMapper::toDto)
                .toList();
    }

    public StartGameResponseDto startGame(StartGameRequestDto request) {
        if (request == null || request.getPlayerId() == null) {
            throw new RuntimeException("playerId is required");
        }
        if (request.getPrepField() == null || request.getPrepField().isBlank()) {
            throw new RuntimeException("prepField is required");
        }
        if (request.getTopic() == null || request.getTopic().isBlank()) {
            throw new RuntimeException("topic is required");
        }
        if (request.getDifficulty() == null || request.getDifficulty().isBlank()) {
            throw new RuntimeException("difficulty is required");
        }
        if (request.getNumberOfQuestions() <= 0) {
            throw new RuntimeException("numberOfQuestions must be greater than 0");
        }
        Player player = playerRepository.findById(request.getPlayerId())
                .orElseThrow(() -> new RuntimeException("Player not found"));

        List<Question> questions = questionService.getRandomQuestionsByTopic(
            request.getDifficulty(), request.getPrepField(), request.getTopic(), request.getNumberOfQuestions());
        int totalQuestions = Math.min(request.getNumberOfQuestions(), questions.size());

        Session session = new Session();
        session.setPlayer(player);
        session.setStartedAt(LocalDateTime.now());
        session.setScore(0);
        session.setCorrectAnswers(0);
        session.setTotalQuestions(totalQuestions);
        Session saved = sessionRepository.save(session);

        List<GameQuestionDto> questionDtos = questions.stream()
                .limit(totalQuestions)
                .map(this::toGameQuestionDto)
                .toList();

        return new StartGameResponseDto(saved.getId(), player.getId(), questionDtos);
    }

    public GameResultDto submitGame(SubmitGameRequestDto request) {
        if (request == null) {
            throw new RuntimeException("Request is required");
        }
        if (request.getSessionId() == null) {
            throw new RuntimeException("sessionId is required");
        }
        if (request.getPlayerId() == null) {
            throw new RuntimeException("playerId is required");
        }
        Session session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));
        Player player = playerRepository.findById(request.getPlayerId())
                .orElseThrow(() -> new RuntimeException("Player not found"));

        int correctAnswers = 0;
        List<SubmitAnswerDto> answers = request.getAnswers() == null
                ? Collections.emptyList()
                : request.getAnswers();

        for (SubmitAnswerDto answer : answers) {
            if (answer == null || answer.getQuestionId() == null) {
                throw new RuntimeException("Each answer must include questionId");
            }
            Question question = questionRepository.findById(answer.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            if (isCorrect(answer.getAnswer(), question.getCorrectAnswer())) {
                correctAnswers++;
            }
        }

        int totalQuestions = session.getTotalQuestions() > 0
                ? session.getTotalQuestions()
                : answers.size();
        int score = correctAnswers * 10;
        int xpGained = score;

        session.setEndedAt(LocalDateTime.now());
        session.setScore(score);
        session.setCorrectAnswers(correctAnswers);
        sessionRepository.save(session);

        int newTotalXp = player.getXp() + xpGained;
        player.setXp(newTotalXp);
        int newLevel = Math.max(player.getLevel(), (newTotalXp / 100) + 1);
        player.setLevel(newLevel);
        playerRepository.save(player);

        long totalSessions = sessionRepository.countByPlayerId(player.getId());
        leaderboardService.upsertEntryForPlayer(player, newTotalXp, (int) totalSessions);

        return new GameResultDto(
                session.getId(),
                player.getId(),
                totalQuestions,
                correctAnswers,
                score,
                xpGained,
                newTotalXp,
                newLevel
        );
    }

    private GameQuestionDto toGameQuestionDto(Question question) {
        return new GameQuestionDto(
                question.getId(),
                question.getTitle(),
                question.getDescription(),
                question.getType(),
                question.getDifficulty(),
                question.getPrepField(),
                question.getTopic(),
                parseOptions(question.getOptionsJson())
        );
    }

    private List<String> parseOptions(String optionsJson) {
        if (optionsJson == null || optionsJson.isBlank()) {
            return List.of();
        }
        try {
            return objectMapper.readValue(optionsJson, new TypeReference<List<String>>() {});
        } catch (Exception ex) {
            return List.of();
        }
    }

    private boolean isCorrect(String submitted, String correct) {
        if (submitted == null || correct == null) {
            return false;
        }
        return submitted.trim().equalsIgnoreCase(correct.trim());
    }
}
