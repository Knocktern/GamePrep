# GamePrep

GamePrep is a gamified interview-prep platform built with Spring Boot and a lightweight vanilla HTML/CSS/JS frontend. It includes player management, questions, sessions, a leaderboard, and a single-player game flow that serves random questions and scores results.

## Features
- Player profiles with XP and levels
- Question bank with difficulty levels
- Session tracking and leaderboard entries
- Single-player game flow (start game, answer questions, submit results)
- Simple neon-themed lobby UI

## Tech Stack
- Backend: Java 21, Spring Boot, Spring Web, Spring Data JPA, MySQL
- Frontend: Vanilla HTML/CSS/JS (Live Server)
- Build: Maven

## Project Structure
```
src/main/java/com/gameprep
  config
  controller
  dto
  mapper
  model
  repository
  service
frontend
```

## Prerequisites
- Java 21
- Maven (or use the included `mvnw` wrapper)
- MySQL 8.x

## Configuration
Credentials are loaded from environment variables or a local-only file.

Create a file at `src/main/resources/application-local.properties` (ignored by git):
```
DB_USERNAME=root
DB_PASSWORD=your_password
```

`src/main/resources/application.properties` already imports the local file:
```
spring.config.import=optional:classpath:application-local.properties
spring.datasource.url=jdbc:mysql://localhost:3306/gameprep_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}
```

## Run the Backend
```
./mvnw -DskipTests clean package
./mvnw spring-boot:run
```

Backend base URL:
- http://localhost:8080

## Run the Frontend
Use VS Code Live Server (or any static server) from `frontend/`:
- http://localhost:5500

## API Endpoints (Core)
- Players: `GET/POST /api/players`, `GET/PUT/DELETE /api/players/{id}`
- Questions: `GET/POST /api/questions`
- Sessions: `POST /api/sessions/start`, `POST /api/sessions/{id}/end`, `GET /api/sessions/player/{playerId}`
- Leaderboard: `GET /api/leaderboard`

## Game Flow API
- Start game: `POST /api/game/start`
- Submit game: `POST /api/game/submit`

### Start Game Request
```
{
  "playerId": 1,
  "difficulty": "EASY",
  "numberOfQuestions": 5
}
```

### Submit Game Request
```
{
  "sessionId": 1,
  "playerId": 1,
  "answers": [
    { "questionId": 10, "answer": "O(log n)" }
  ]
}
```

## Seed Data (Optional)
If you want demo data quickly, insert sample questions and players into MySQL. You can add your own seed script in a local SQL file or use the one from the chat history.

## Notes
- The frontend expects the backend at `http://localhost:8080/api`.
- CORS is enabled for `http://localhost:5500` and `http://127.0.0.1:5500`.
- The leaderboard rank column is `rank_position` in the DB.
