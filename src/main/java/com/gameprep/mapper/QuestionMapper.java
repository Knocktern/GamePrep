package com.gameprep.mapper;

import com.gameprep.dto.QuestionDto;
import com.gameprep.model.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public QuestionDto toDto(Question entity) {
        if (entity == null) {
            return null;
        }
        return new QuestionDto(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getType(),
                entity.getDifficulty()
        );
    }

    public Question toEntity(QuestionDto dto) {
        if (dto == null) {
            return null;
        }
        Question question = new Question();
        question.setId(dto.getId());
        question.setTitle(dto.getTitle());
        question.setDescription(dto.getDescription());
        question.setType(dto.getType());
        question.setDifficulty(dto.getDifficulty());
        return question;
    }
}
