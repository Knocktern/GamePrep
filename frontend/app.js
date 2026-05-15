const API_BASE = "http://localhost:8080/api";

const playersContainer = document.getElementById("playersContainer");
const logoutBtn = document.getElementById("logoutBtn");
const accountStatus = document.getElementById("accountStatus");
const currentUserLabel = document.getElementById("currentUser");
const totalPlayersLabel = document.getElementById("totalPlayersLabel");
const topLevelLabel = document.getElementById("topLevelLabel");
const selectedPlayer = document.getElementById("selectedPlayer");
const difficultySelect = document.getElementById("difficultySelect");
const questionCountInput = document.getElementById("questionCount");
const startGameBtn = document.getElementById("startGameBtn");
const gameArea = document.getElementById("gameArea");
const gameResult = document.getElementById("gameResult");
const gameError = document.getElementById("gameError");

let statusTimeoutId = null;
let currentSessionId = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentAnswers = new Map();
let currentUser = null;
const TOKEN_KEY = "gameprep_token";

async function readErrorMessage(response, fallback) {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (data && data.message) {
        return data.message;
      }
      return JSON.stringify(data);
    }
    const text = await response.text();
    return text || fallback;
  } catch (error) {
    return fallback;
  }
}

function updateStats(players) {
  const list = Array.isArray(players) ? players : [];
  const totalPlayers = list.length;
  const topLevel = list.reduce((max, player) => {
    const level = typeof player.level === "number" ? player.level : 0;
    return Math.max(max, level);
  }, 0);

  if (totalPlayersLabel) {
    totalPlayersLabel.textContent = `Total Players: ${totalPlayers}`;
  }
  if (topLevelLabel) {
    topLevelLabel.textContent = `Top Level: ${topLevel}`;
  }
}

function showAccountMessage(message, isError = false) {
  if (!accountStatus) {
    return;
  }
  accountStatus.textContent = message;
  accountStatus.classList.toggle("error", isError);
  accountStatus.classList.add("visible");

  if (statusTimeoutId) {
    clearTimeout(statusTimeoutId);
  }

  statusTimeoutId = setTimeout(() => {
    accountStatus.classList.remove("visible");
    accountStatus.classList.remove("error");
  }, 2000);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function setCurrentUser(user) {
  currentUser = user;
  if (currentUserLabel) {
    currentUserLabel.textContent = user
      ? `Logged in as ${user.username} (Level ${user.level})`
      : "Not logged in.";
  }
  if (logoutBtn) {
    logoutBtn.disabled = !user;
  }
  if (selectedPlayer) {
    selectedPlayer.disabled = Boolean(user);
    if (user) {
      selectedPlayer.value = String(user.id);
    }
  }
}

async function loadCurrentUser() {
  const token = getToken();
  if (!token) {
    redirectToLogin();
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        ...authHeaders(),
      },
    });
    if (!response.ok) {
      throw new Error("Unauthorized");
    }
    const user = await response.json();
    setCurrentUser(user);
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    redirectToLogin();
  }
}

function redirectToLogin() {
  window.location.href = "login.html";
}

async function fetchPlayers() {
  try {
    const response = await fetch(`${API_BASE}/players`);
    if (!response.ok) {
      throw new Error(`Failed to load players: ${response.status}`);
    }
    const players = await response.json();
    const sortedPlayers = Array.isArray(players)
      ? [...players].sort((a, b) => {
          const xpDiff = (b.xp || 0) - (a.xp || 0);
          if (xpDiff !== 0) {
            return xpDiff;
          }
          return (b.level || 0) - (a.level || 0);
        })
      : [];
    populatePlayerSelect(sortedPlayers);
    if (currentUser) {
      const updated = sortedPlayers.find((player) => player.id === currentUser.id);
      if (updated) {
        setCurrentUser(updated);
      }
    }
    updateStats(sortedPlayers);
    renderPlayers(sortedPlayers);
  } catch (error) {
    console.error(error);
    updateStats([]);
    playersContainer.innerHTML = "<div class=\"empty\">Could not load players.</div>";
    populatePlayerSelect([]);
  }
}

function renderPlayers(players) {
  if (!Array.isArray(players) || players.length === 0) {
    playersContainer.innerHTML = "<div class=\"empty\">No players yet.</div>";
    return;
  }

  playersContainer.innerHTML = players
    .map((player, index) => {
      const delay = index * 0.04;
      const username = player.username || "Unknown";
      const level = typeof player.level === "number" ? player.level : 0;
      const xp = typeof player.xp === "number" ? player.xp : 0;
      return `
        <div class="player-card" style="animation-delay: ${delay}s">
          <h3>${username}</h3>
          <div class="stat">Level ${level}</div>
          <div class="stat">XP ${xp}</div>
        </div>
      `;
    })
    .join("");
}

function populatePlayerSelect(players) {
  if (!selectedPlayer) {
    return;
  }
  const previousValue = selectedPlayer.value;
  if (!Array.isArray(players) || players.length === 0) {
    selectedPlayer.innerHTML = "<option value=\"\">No players available</option>";
    return;
  }

  selectedPlayer.innerHTML = players
    .map((player) => {
      const label = `${player.username} (ID ${player.id})`;
      return `<option value="${player.id}">${label}</option>`;
    })
    .join("");

  if (currentUser) {
    selectedPlayer.value = String(currentUser.id);
  } else if (previousValue && players.some((player) => String(player.id) === previousValue)) {
    selectedPlayer.value = previousValue;
  }
}

async function logout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: {
        ...authHeaders(),
      },
    });
  } catch (error) {
    console.error(error);
  }
  localStorage.removeItem(TOKEN_KEY);
  showAccountMessage("Logged out.");
  redirectToLogin();
}

function showGameMessage(message, isError = false) {
  if (!gameError) {
    return;
  }
  gameError.textContent = message;
  gameError.classList.toggle("error", isError);
  gameError.classList.add("visible");

  setTimeout(() => {
    gameError.classList.remove("visible");
    gameError.classList.remove("error");
  }, 2000);
}

async function startGame() {
  const playerId = currentUser ? currentUser.id : (selectedPlayer ? selectedPlayer.value : "");
  const difficulty = difficultySelect ? difficultySelect.value : "EASY";
  const numberOfQuestions = Number.parseInt(questionCountInput.value, 10);

  if (!playerId) {
    showGameMessage("Log in to start a game.", true);
    return;
  }

  if (!Number.isFinite(numberOfQuestions) || numberOfQuestions < 1) {
    showGameMessage("Choose at least 1 question.", true);
    return;
  }

  startGameBtn.disabled = true;
  gameResult.textContent = "";

  try {
    const response = await fetch(`${API_BASE}/game/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        playerId: Number(playerId),
        difficulty,
        numberOfQuestions,
      }),
    });

    if (!response.ok) {
      const message = await readErrorMessage(response, `Failed to start game: ${response.status}`);
      throw new Error(message);
    }

    const payload = await response.json();
    currentSessionId = payload.sessionId;
    currentQuestions = Array.isArray(payload.questions) ? payload.questions : [];
    currentQuestionIndex = 0;
    currentAnswers = new Map();

    if (currentQuestions.length === 0) {
      gameArea.innerHTML = "<p class=\"hint\">No questions found for this difficulty.</p>";
      return;
    }

    renderQuestion();
  } catch (error) {
    console.error(error);
    showGameMessage(error.message || "Could not start game.", true);
  } finally {
    startGameBtn.disabled = false;
  }
}

function renderQuestion() {
  if (!currentQuestions.length) {
    gameArea.innerHTML = "<p class=\"hint\">No questions loaded.</p>";
    return;
  }

  const question = currentQuestions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const total = currentQuestions.length;

  gameArea.innerHTML = `
    <div>
      <div class="question-title">Question ${questionNumber} of ${total}</div>
      <div class="question-text">${question.description || question.title || "Question"}</div>
      <div id="optionsContainer" class="option-list"></div>
      <div class="game-actions">
        <button id="nextQuestionBtn" type="button">${questionNumber === total ? "Submit Game" : "Next"}</button>
      </div>
    </div>
  `;

  const optionsContainer = document.getElementById("optionsContainer");
  const options = Array.isArray(question.options) ? question.options : [];
  const selected = currentAnswers.get(question.id);

  if (options.length > 0) {
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";
      if (selected === option) {
        button.classList.add("selected");
      }
      button.textContent = option;
      button.dataset.value = option;
      button.addEventListener("click", () => {
        optionsContainer.querySelectorAll(".option-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
      });
      optionsContainer.appendChild(button);
    });
  } else {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "freeAnswer";
    input.placeholder = "Type your answer";
    if (selected) {
      input.value = selected;
    }
    optionsContainer.appendChild(input);
  }

  const nextButton = document.getElementById("nextQuestionBtn");
  nextButton.addEventListener("click", () => handleNext(question));
}

function handleNext(question) {
  const options = Array.isArray(question.options) ? question.options : [];
  let answer = "";

  if (options.length > 0) {
    const selectedOption = gameArea.querySelector(".option-btn.selected");
    if (!selectedOption) {
      showGameMessage("Pick an answer to continue.", true);
      return;
    }
    answer = selectedOption.dataset.value;
  } else {
    const input = document.getElementById("freeAnswer");
    answer = input ? input.value.trim() : "";
    if (!answer) {
      showGameMessage("Enter an answer to continue.", true);
      return;
    }
  }

  currentAnswers.set(question.id, answer);

  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    submitGame();
  }
}

async function submitGame() {
  const playerId = currentUser ? currentUser.id : selectedPlayer.value;
  if (!currentSessionId || !playerId) {
    showGameMessage("No active session.", true);
    return;
  }

  const answers = currentQuestions.map((question) => ({
    questionId: question.id,
    answer: currentAnswers.get(question.id) || "",
  }));

  try {
    const response = await fetch(`${API_BASE}/game/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        sessionId: currentSessionId,
        playerId: Number(playerId),
        answers,
      }),
    });

    if (!response.ok) {
      const message = await readErrorMessage(response, `Failed to submit game: ${response.status}`);
      throw new Error(message);
    }

    const result = await response.json();
    gameResult.innerHTML = `
      <div>Score: ${result.score} | Correct: ${result.correctAnswers}/${result.totalQuestions}</div>
      <div>XP Gained: ${result.xpGained} | Total XP: ${result.newTotalXp}</div>
      <div>New Level: ${result.newLevel}</div>
    `;
    showGameMessage("Run complete!", false);
    await fetchPlayers();
  } catch (error) {
    console.error(error);
    showGameMessage(error.message || "Could not submit game.", true);
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
if (startGameBtn) {
  startGameBtn.addEventListener("click", startGame);
}
window.addEventListener("DOMContentLoaded", () => {
  setCurrentUser(null);
  loadCurrentUser().then(fetchPlayers);
});
