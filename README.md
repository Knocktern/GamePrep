# GamePrep

GamePrep is a cyberpunk arcade-style interview preparation app. It turns OOP, DSA, Operating Systems, and DBMS practice into a mission loop: choose a field, study difficulty-matched pre-mission intel, fight question enemies, lose lives on wrong answers, earn XP, and climb the leaderboard.

The project is currently a Spring Boot backend with a vanilla HTML/CSS/JavaScript frontend in [frontend_new](frontend_new).

## Current Features

- Multi-user signup and login with token-based sessions stored in browser local storage.
- Cyberpunk landing page with recruit/veteran entry, signal stats, and mission briefing.
- Mission selection by subject, topic, and difficulty.
- Difficulty-specific lessons before each mission.
- MCQ and coding-style questions.
- Enemy-based arena UI where every question is shown as an enemy.
- Health/lives HUD with heart damage animation on wrong answers.
- Expected answer reveal for wrong MCQ and coding answers.
- XP, levels, mission completion/failure, and leaderboard support.
- Local and port-forward-friendly API configuration for frontend testing.

## Learning Tracks

The dashboard currently exposes these tracks:

| Field | Topics |
|---|---|
| OOP | Classes, Inheritance, Polymorphism, Encapsulation |
| DSA | Arrays, Linked List, Stack, Queue, Tree, Graph |
| Operating System | Bash Script, Process, Thread, Memory Management |
| DBMS | SQL Basics, Normalization, Indexing, Transactions |

Question languages are aligned with the track:

- OOP: Java
- DSA: C++
- Operating System: Bash
- DBMS: SQL

## Tech Stack

- Backend: Java 21, Spring Boot 3.5, Spring Web, Spring Data JPA, Hibernate, MySQL
- Frontend: HTML, CSS, vanilla JavaScript
- Auth: simple token stored on the `players` table and in browser `localStorage`
- Build: Maven wrapper

## Project Structure

```text
gameprep/
├── frontend_new/
│   ├── landing.html          # Main entry page
│   ├── index.html            # Login/signup screen
│   ├── dashboard.html        # Mission selection and lesson/intel flow
│   ├── arena.html            # Enemy question arena
│   ├── css/styles.css        # Shared cyberpunk theme
│   └── js/
│       ├── api.js            # API base resolution, token headers, fetch wrapper
│       ├── auth.js           # Login/signup flow
│       ├── dashboard.js      # Topics, lessons, mission launch
│       └── game.js           # Arena rendering, answers, lives, end screen
├── src/main/java/com/gameprep/
│   ├── config/               # CORS, password encoder, web config
│   ├── controller/           # REST API controllers
│   ├── dto/                  # Request/response DTOs
│   ├── mapper/               # Entity/DTO mapping
│   ├── model/                # JPA entities
│   ├── repository/           # Spring Data repositories
│   ├── service/              # Auth, game sessions, scoring, progress, leaderboard
│   └── util/                 # Topic map
├── src/main/resources/
│   ├── application.properties
│   └── application-local.properties
├── seed_questions_v2_part1.sql      # OOP questions
├── seed_questions_v2_part2.sql      # DSA Arrays, Linked List, Stack
├── seed_questions_v2_part3.sql      # DSA Queue, Tree, Graph
├── seed_questions_os_dbms.sql       # Operating System and DBMS questions
└── pom.xml
```

## Prerequisites

- Java 21
- MySQL 8.x
- A local static server for the frontend, such as VS Code Live Server

Maven is provided through the wrapper scripts [mvnw](mvnw) and [mvnw.cmd](mvnw.cmd).

## Database Setup

Create the database if it does not exist:

```sql
CREATE DATABASE IF NOT EXISTS gameprep_db;
```

The default datasource is configured in [application.properties](src/main/resources/application.properties). You can override credentials in `src/main/resources/application-local.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

The app uses `spring.jpa.hibernate.ddl-auto=update`, so tables are created/updated when the backend starts.

## Seed Data

For full mission coverage, run the seed scripts manually in MySQL.

Recommended run order:

```sql
SOURCE C:/Users/Acer/Desktop/gameprep/seed_questions_v2_part1.sql;
SOURCE C:/Users/Acer/Desktop/gameprep/seed_questions_v2_part2.sql;
SOURCE C:/Users/Acer/Desktop/gameprep/seed_questions_v2_part3.sql;
SOURCE C:/Users/Acer/Desktop/gameprep/seed_questions_os_dbms.sql;
```

Coverage goal:

- 20 MCQ questions per topic per difficulty
- 5 coding questions per topic per difficulty
- Difficulties: EASY, MEDIUM, HARD

To verify question counts:

```sql
SELECT
    prep_field,
    topic,
    difficulty,
    type,
    COUNT(*) AS question_count
FROM questions
GROUP BY prep_field, topic, difficulty, type
ORDER BY prep_field, topic, difficulty, type;
```

## Run The Backend

From the project root:

```powershell
.\mvnw.cmd spring-boot:run
```

Or build first:

```powershell
.\mvnw.cmd clean package -DskipTests
.\mvnw.cmd spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

## Run The Frontend Locally

Use Live Server or another static server from the [frontend_new](frontend_new) folder.

Typical local URL:

```text
http://localhost:5500/landing.html
```

You can also open [landing.html](frontend_new/landing.html) directly from disk for local development, but a static server is recommended.

## Port Forward Testing

The frontend API wrapper in [api.js](frontend_new/js/api.js) supports port-forwarded testing.

If you forward both ports:

- Frontend: `5500`
- Backend: `8080`

Open the forwarded frontend URL. The frontend will try to reach the same host on backend port `8080`.

If the forwarded backend URL is separate, pass it explicitly:

```text
https://your-forwarded-5500-url/index.html?api=https://your-forwarded-8080-url
```

The `?api=` value may include `/api`, but it is not required.

## API Summary

Authentication:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

Game flow:

- `POST /api/game/start`
- `POST /api/game/answer`
- `POST /api/game/submit`

Player and leaderboard:

- `GET /api/players`
- `GET /api/players/{id}`
- `GET /api/players/me/progress`
- `GET /api/leaderboard`

Questions:

- `GET /api/questions`
- `GET /api/questions?difficulty=EASY`
- `POST /api/questions`

## Development Notes

- Restart the backend after Java changes.
- Refresh the browser after frontend JavaScript or HTML changes.
- If login/signup says `Failed to fetch`, check that backend port `8080` is reachable from the browser and that the forwarded frontend is using the correct `?api=` URL.
- If a mission has no questions, the backend rejects empty mission starts and the arena shows a clear fallback message for stale sessions.
- The leaderboard rank column is `rank_position` in the database.

## Useful Commands

Compile backend:

```powershell
.\mvnw.cmd -DskipTests clean compile
```

Check frontend JavaScript syntax:

```powershell
node --check frontend_new/js/api.js
node --check frontend_new/js/auth.js
node --check frontend_new/js/dashboard.js
node --check frontend_new/js/game.js
```

## Possible Next Features

Good next additions for this project:

- Admin question manager: add/edit/delete questions from a protected dashboard instead of editing SQL.
- Real code evaluation: run coding answers against test cases in a sandboxed service instead of exact string comparison.
- Mission review screen: after a mission, show every enemy, the user's answer, correct answer, explanation, and retry option.
- Streaks and daily missions: encourage regular practice with daily XP bonuses.
- Achievement badges: unlock badges for clearing topics, perfect runs, hard-mode wins, and coding-question streaks.
- Adaptive difficulty: increase or decrease difficulty based on recent accuracy.
- Better progress map: show locked/unlocked/cleared topics visually per player.
- Timed boss fights: add optional countdown missions for interview-speed practice.
- Explanation field for questions: store a detailed explanation in the DB and display it after answering.
- Public deployment profile: add production-ready config for deployed frontend/backend URLs.
