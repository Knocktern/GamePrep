package com.gameprep.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gameprep.dto.AnswerResultDto;
import com.gameprep.dto.GameQuestionDto;
import com.gameprep.dto.GameResultDto;
import com.gameprep.dto.SessionDto;
import com.gameprep.dto.StartGameRequestDto;
import com.gameprep.dto.StartGameResponseDto;
import com.gameprep.dto.SubmitAnswerDto;
import com.gameprep.dto.SubmitGameRequestDto;
import com.gameprep.dto.SubmitSingleAnswerDto;
import com.gameprep.mapper.SessionMapper;
import com.gameprep.model.Player;
import com.gameprep.model.Question;
import com.gameprep.model.Session;
import com.gameprep.repository.PlayerRepository;
import com.gameprep.repository.QuestionRepository;
import com.gameprep.repository.SessionRepository;
import com.gameprep.util.GameMap;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SessionService {

    private static final String STATUS_ACTIVE = "ACTIVE";
    private static final String STATUS_FAILED = "FAILED";
    private static final String STATUS_COMPLETED = "COMPLETED";

    private final SessionRepository sessionRepository;
    private final PlayerRepository playerRepository;
    private final SessionMapper sessionMapper;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;
    private final LeaderboardService leaderboardService;
    private final ObjectMapper objectMapper;
    private final PlayerProgressService playerProgressService;

    public SessionService(SessionRepository sessionRepository,
                          PlayerRepository playerRepository,
                          SessionMapper sessionMapper,
                          QuestionService questionService,
                          QuestionRepository questionRepository,
                          LeaderboardService leaderboardService,
                          ObjectMapper objectMapper,
                          PlayerProgressService playerProgressService) {
        this.sessionRepository = sessionRepository;
        this.playerRepository = playerRepository;
        this.sessionMapper = sessionMapper;
        this.questionService = questionService;
        this.questionRepository = questionRepository;
        this.leaderboardService = leaderboardService;
        this.objectMapper = objectMapper;
        this.playerProgressService = playerProgressService;
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
        session.setAnsweredQuestions(0);
        session.setCurrentHealth(startingHealthForDifficulty(null));
        session.setStatus(STATUS_ACTIVE);
        Session saved = sessionRepository.save(session);
        return sessionMapper.toDto(saved);
    }

    public SessionDto endSession(Long sessionId, int score, int correctAnswers) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setEndedAt(LocalDateTime.now());
        session.setScore(score);
        session.setCorrectAnswers(correctAnswers);
        session.setStatus(STATUS_COMPLETED);
        Session saved = sessionRepository.save(session);
        return sessionMapper.toDto(saved);
    }

    public List<SessionDto> getSessionsForPlayer(Long playerId) {
        return sessionRepository.findByPlayerId(playerId).stream()
                .map(sessionMapper::toDto)
                .toList();
    }

    @Transactional
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
        if (request.getNumberOfQuestions() <= 0) {
            throw new RuntimeException("numberOfQuestions must be greater than 0");
        }
        Player player = playerRepository.findById(request.getPlayerId())
                .orElseThrow(() -> new RuntimeException("Player not found"));

        playerProgressService.ensureStarterUnlocks(player);
        if (!GameMap.isTopicInField(request.getPrepField(), request.getTopic())) {
            throw new RuntimeException("Topic is not part of the expedition map");
        }

        int perDifficulty = request.getNumberOfQuestions();
        String requestedDiff = request.getDifficulty();
        List<Question> questions = new java.util.ArrayList<>();
        
        if (requestedDiff != null && !requestedDiff.isBlank()) {
            questions.addAll(questionService.getRandomQuestionsByTopic(
                requestedDiff.trim().toUpperCase(), request.getPrepField(), request.getTopic(), perDifficulty));
        } else {
            List<Question> easyQuestions = questionService.getRandomQuestionsByTopic(
                "EASY", request.getPrepField(), request.getTopic(), perDifficulty);
            List<Question> mediumQuestions = questionService.getRandomQuestionsByTopic(
                "MEDIUM", request.getPrepField(), request.getTopic(), perDifficulty);
            List<Question> hardQuestions = questionService.getRandomQuestionsByTopic(
                "HARD", request.getPrepField(), request.getTopic(), perDifficulty);
            questions.addAll(easyQuestions);
            questions.addAll(mediumQuestions);
            questions.addAll(hardQuestions);
        }
        int totalQuestions = questions.size();

        if (totalQuestions == 0) {
            String difficulty = requestedDiff == null || requestedDiff.isBlank()
                ? "any difficulty"
                : requestedDiff.trim().toUpperCase();
            throw new RuntimeException("No questions available for "
                + request.getPrepField() + " / " + request.getTopic() + " / " + difficulty
                + ". Please seed questions for this mission before starting.");
        }

        int startingHealth = startingHealthForDifficulty(requestedDiff != null && !requestedDiff.isBlank() ? requestedDiff : "EASY");

        Session session = new Session();
        session.setPlayer(player);
        session.setStartedAt(LocalDateTime.now());
        session.setScore(0);
        session.setCorrectAnswers(0);
        session.setTotalQuestions(totalQuestions);
        session.setAnsweredQuestions(0);
        session.setCurrentHealth(startingHealth);
        session.setStatus(STATUS_ACTIVE);
        session.setPrepField(request.getPrepField());
        session.setTopic(request.getTopic());
        Session saved = sessionRepository.save(session);

        List<GameQuestionDto> questionDtos = questions.stream()
                .limit(totalQuestions)
                .map(this::toGameQuestionDto)
                .toList();

        return new StartGameResponseDto(saved.getId(), player.getId(), questionDtos,
            startingHealth, startingHealth, saved.getStatus(),
            request.getPrepField(), request.getTopic(), requestedDiff);
    }

    @Transactional
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
        if (session.getPlayer() == null || !player.getId().equals(session.getPlayer().getId())) {
            throw new RuntimeException("Session does not belong to player");
        }

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
        session.setCorrectAnswers(correctAnswers);
        session.setAnsweredQuestions(totalQuestions);
        GameResultDto result = finalizeSession(session, player, STATUS_COMPLETED);
        if (session.getPrepField() != null && session.getTopic() != null) {
            playerProgressService.markClearedAndUnlockNext(player, session.getPrepField(), session.getTopic());
        }
        return result;
    }

    @Transactional
    public AnswerResultDto submitAnswer(Player player, SubmitSingleAnswerDto request) {
        if (request == null) {
            throw new RuntimeException("Request is required");
        }
        if (request.getSessionId() == null) {
            throw new RuntimeException("sessionId is required");
        }
        if (request.getQuestionId() == null) {
            throw new RuntimeException("questionId is required");
        }

        Session session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));
        if (session.getPlayer() == null || !player.getId().equals(session.getPlayer().getId())) {
            throw new RuntimeException("Session does not belong to player");
        }
        String status = normalizeStatus(session.getStatus());
        if (!STATUS_ACTIVE.equals(status)) {
            throw new RuntimeException("Session is not active");
        }
        if (session.getTotalQuestions() <= 0) {
            throw new RuntimeException("Session has no questions");
        }
        if (session.getAnsweredQuestions() >= session.getTotalQuestions()) {
            throw new RuntimeException("Session already completed");
        }

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));
        if (!GameMap.isTopicInField(session.getPrepField(), session.getTopic())) {
            throw new RuntimeException("Session topic is not part of the expedition map");
        }
        if (!matchesSessionTopic(question, session)) {
            throw new RuntimeException("Question does not belong to this session");
        }

        boolean correct = isCorrect(request.getAnswer(), question.getCorrectAnswer());
        if (correct) {
            session.setCorrectAnswers(session.getCorrectAnswers() + 1);
        } else {
            session.setCurrentHealth(Math.max(0, session.getCurrentHealth() - 1));
        }
        session.setAnsweredQuestions(session.getAnsweredQuestions() + 1);

        GameResultDto finalResult = null;
        String newStatus = STATUS_ACTIVE;
        if (session.getCurrentHealth() <= 0) {
            newStatus = STATUS_FAILED;
            finalResult = finalizeSession(session, player, newStatus);
        } else if (session.getAnsweredQuestions() >= session.getTotalQuestions()) {
            newStatus = STATUS_COMPLETED;
            finalResult = finalizeSession(session, player, newStatus);
            playerProgressService.markClearedAndUnlockNext(player, session.getPrepField(), session.getTopic());
        } else {
            session.setStatus(STATUS_ACTIVE);
            sessionRepository.save(session);
        }

        return new AnswerResultDto(
                correct,
                session.getCurrentHealth(),
                correct ? null : question.getCorrectAnswer(),
                newStatus,
                session.getAnsweredQuestions(),
                session.getTotalQuestions(),
                finalResult
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

    private boolean matchesSessionTopic(Question question, Session session) {
        if (question == null || session == null) {
            return false;
        }
        String prepField = session.getPrepField();
        String topic = session.getTopic();
        return prepField != null
                && topic != null
                && prepField.equalsIgnoreCase(question.getPrepField())
                && topic.equalsIgnoreCase(question.getTopic());
    }

    private int startingHealthForDifficulty(String difficulty) {
        if (difficulty == null) {
            return 3;
        }
        return switch (difficulty.trim().toUpperCase()) {
            case "EASY" -> 4;
            case "HARD" -> 2;
            default -> 3;
        };
    }

    private String normalizeStatus(String status) {
        if (status == null || status.isBlank()) {
            return STATUS_ACTIVE;
        }
        return status.trim().toUpperCase();
    }

    private GameResultDto finalizeSession(Session session, Player player, String status) {
        session.setEndedAt(LocalDateTime.now());
        session.setStatus(status);
        int correctAnswers = session.getCorrectAnswers();
        int totalQuestions = session.getTotalQuestions() > 0
                ? session.getTotalQuestions()
                : session.getAnsweredQuestions();
        int score = correctAnswers * 10;
        int xpGained = score;

        session.setScore(score);
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
}
