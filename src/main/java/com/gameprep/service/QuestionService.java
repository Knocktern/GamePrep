package com.gameprep.service;

import com.gameprep.dto.QuestionDto;
import com.gameprep.mapper.QuestionMapper;
import com.gameprep.model.Question;
import com.gameprep.repository.QuestionRepository;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(questionMapper::toDto)
                .toList();
    }

    public QuestionDto createQuestion(QuestionDto q) {
        Question entity = questionMapper.toEntity(q);
        Question saved = questionRepository.save(entity);
        return questionMapper.toDto(saved);
    }

    public List<QuestionDto> getQuestionsByDifficulty(String difficulty) {
        return questionRepository.findByDifficulty(difficulty).stream()
                .map(questionMapper::toDto)
                .toList();
    }

    public List<Question> getRandomQuestionsByDifficulty(String difficulty, int limit) {
        return questionRepository.findRandomByDifficulty(difficulty, PageRequest.of(0, limit));
    }

    public List<Question> getRandomQuestionsByTopic(String difficulty, String prepField, String topic, int limit) {
        if (topic == null || topic.isBlank()) {
            return questionRepository.findRandomByDifficultyAndPrepField(
                    difficulty, prepField, PageRequest.of(0, limit));
        }
        return questionRepository.findRandomByDifficultyAndPrepFieldAndTopic(
                difficulty, prepField, topic, PageRequest.of(0, limit));
    }
}
