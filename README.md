# GamePrep 🕹️

GamePrep is a highly gamified, cyberpunk-themed interview-prep platform. It transforms standard software engineering preparation (DSA, OOP, System Design, DBMS) into an immersive arcade experience. Complete with player leveling up, pre-mission learning intel menus, and high-scores, GamePrep takes you out of the boring IDE and into the Matrix.


## 🎮 The Arcade Interface (Frontend)
The frontend is designed from the ground up to simulate an arcade terminal. Housed under the `frontend_new` directory, it relies on Vanilla HTML/CSS/JS sprinkled with heavy CSS variables and animations to create a cohesive retro-futuristic atmosphere.

### 🚀 Application Flow & How It Works
1. **Landing Gateway (`landing.html`)**
   A fully animated, 3D moving-grid matrix background introduces "New Recruits" and "Veterans" to the platform. 
2. **Authentication (`index.html`)**
   The entry portal where users 'Insert Coin' to start. Utilizes a token-based authentication architecture (stored as `gameprep_token_new` in local storage).
3. **Lobby Hub (`dashboard.html`)**
   A sleek multi-step wizard used to route players into their exact training scenario:
   - **Step 1: Worlds (Subjects)** - Select from OOP, DSA, DBMS, or Operating Systems.
   - **Step 2: Zones (Topics)** - Narrow down to specifics (e.g., Arrays, Classes, SQL Basics).
   - **Step 2.5: Pre-Mission Intel [NEW]** - An embedded mini-crash course! You receive rich reading texts, documentation cross-links (W3Schools, GeeksForGeeks), and video logs (YouTube tutorials) right inside the HUD.
   - **Step 3: Mission Config** - Modify the difficulty level (`EASY`, `MEDIUM`, `HARD`) and Enemy Count (number of questions).
4. **Combat Arena (`arena.html`)**
   The mission proper. Face off against questions. Features a dynamic health-bar, progress track, and instant feedback. At the end, an "End Screen Overlay" reveals your XP gained, new levels acquired, and total survival score.


## ⚙️ Tech Stack

## 🏗️ Project Structure
```text
gameprep/
├── frontend_new/            # Cyberpunk Arcade Frontend
│   ├── css/styles.css       # Core design tokens
│   ├── js/                  # Routing, API wrapper, and auth logic
│   ├── landing.html         # Portal Gateway
│   ├── index.html           # Login/Signup
│   ├── dashboard.html       # Config Wizard & Intel HUD
│   └── arena.html           # Core Gameplay Loop
├── src/main/java...         # Spring Boot Backend Code
│   ├── config/              # Web & Security Configurations
│   ├── controller/          # REST API Controllers
│   ├── dto/                 # Data Transfer Objects
│   ├── model/               # DB Entities (Player, Question, Leaderboard)
│   ├── repository/          # JPA Repositories
│   └── service/             # Business Logic (Score calculating, Leveling)
├── src/main/resources       # Application properties
├── seed_questions.sql       # Database Seed for 18+ topics!
└── pom.xml                  # Maven Dependencies
```

## 🛠️ Prerequisites

## 🔌 Setup & Configuration

1. **Database Setup**
   Ensure MySQL is running on port 3306. Create a file at `src/main/resources/application-local.properties` (this is ignored by git) to securely store your credentials:
   ```properties
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

2. **Run the Backend**
   Compile and run the Spring Boot app:
   ```bash
   ./mvnw clean package -DskipTests
   ./mvnw spring-boot:run
   ```
   The backend boots up locally on `http://localhost:8080`.

3. **Run the Frontend**
   Open the `frontend_new` directory using a local static file server like VS Code's **Live Server** plugin.
   *Ensure the server runs on standard ports mapped in the CORS config (e.g. `http://localhost:5500` or port `8080` proxied).* Navigate directly to `landing.html` to begin your journey!

## 💾 API Architecture 
  - `POST /api/game/start` (Requests difficulty, topic, limit)
  - `POST /api/game/submit` (Generates score, calculates XP, determines level ups, updates global leaderboards)

## 📝 Seed Data Note
To have a populated Combat Arena out the gate, run the included `seed_questions.sql` within your database. It prepares hundreds of categorized questions spanning OOP, DSA, DBMS, and OS paradigms with matching answers designed for the Gamified API.
