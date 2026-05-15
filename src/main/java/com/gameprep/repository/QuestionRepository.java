package com.gameprep.repository;

import com.gameprep.model.Question;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByDifficulty(String difficulty);

    @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty ORDER BY RAND()", nativeQuery = true)
    List<Question> findRandomByDifficulty(@Param("difficulty") String difficulty, Pageable pageable);

        @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty AND prep_field = :prepField ORDER BY RAND()",
            nativeQuery = true)
        List<Question> findRandomByDifficultyAndPrepField(@Param("difficulty") String difficulty,
                                  @Param("prepField") String prepField,
                                  Pageable pageable);

        @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty AND prep_field = :prepField AND topic = :topic ORDER BY RAND()",
            nativeQuery = true)
        List<Question> findRandomByDifficultyAndPrepFieldAndTopic(@Param("difficulty") String difficulty,
                                      @Param("prepField") String prepField,
                                      @Param("topic") String topic,
                                      Pageable pageable);
}
