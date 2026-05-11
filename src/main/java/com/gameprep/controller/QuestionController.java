package com.gameprep.controller;

import com.gameprep.dto.QuestionDto;
import com.gameprep.service.QuestionService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionDto> getQuestions(@RequestParam(required = false) String difficulty) {
        if (difficulty == null || difficulty.isBlank()) {
            return questionService.getAllQuestions();
        }
        return questionService.getQuestionsByDifficulty(difficulty);
    }

    @PostMapping
    public ResponseEntity<QuestionDto> createQuestion(@RequestBody QuestionDto question) {
        QuestionDto created = questionService.createQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
