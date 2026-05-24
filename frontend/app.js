/* =====================================================
   APP.JS  —  GamePrep multi-step wizard SPA
   All API calls are unchanged; only UI wiring is new.
   ===================================================== */

const API_BASE   = "http://localhost:8080/api";
const TOKEN_KEY  = "gameprep_token";

const TOPIC_MAP = {
  OOP:              ["Classes", "Inheritance", "Polymorphism", "Encapsulation"],
  DSA:              ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph"],
  OPERATING_SYSTEM: ["Bash Script", "Process", "Thread", "Memory Management"],
  DBMS:             ["SQL Basics", "Normalization", "Indexing", "Transactions"],
};

/* ── State ── */
let currentUser          = null;
let selectedField        = null;
let selectedTopic        = null;
let selectedDifficulty   = null;
let questionCount        = 5;
let currentSessionId     = null;
let currentQuestions     = [];
let currentQuestionIndex = 0;
let progressByField       = new Map();
let progressLoaded        = false;
let currentHealth         = 0;
let maxHealth             = 0;
let isSubmittingAnswer    = false;

/* ── DOM refs ── */
const $ = id => document.getElementById(id);

/* =====================================================
   PARTICLES
   ===================================================== */
function spawnParticles() {
  const container = $("particles");
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * -20}%;
      animation-duration:${Math.random() * 14 + 10}s;
      animation-delay:${Math.random() * 8}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}

/* =====================================================
   VIEW ROUTER
   ===================================================== */
const VIEWS = ["viewLobby","viewStep1","viewStep2","viewStep3","viewStep4","viewGame","viewResults"];

function showView(targetId, direction = "forward") {
  const current = document.querySelector(".view.active");
  const target  = $(targetId);
  if (!target || current === target) return;

  // 1. Fade out the current view, then hide it so it never bleeds through
  if (current) {
    current.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    current.style.opacity    = "0";
    current.style.transform  = direction === "forward" ? "translateX(-28px)" : "translateX(28px)";
    setTimeout(() => {
      current.classList.remove("active");  // triggers display:none via CSS
      current.style.cssText = "";          // clear inline styles for next time
    }, 210);
  }

  // 2. Prepare the new view off-screen then animate it in
  target.style.cssText = `opacity:0; transform:translateX(${
    direction === "forward" ? "28px" : "-28px"
  }); transition:none;`;
  target.classList.add("active");  // display:block via CSS

  // Double rAF ensures the browser applies the starting styles before transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.style.transition = "opacity 0.35s cubic-bezier(.4,0,.2,1), transform 0.35s cubic-bezier(.4,0,.2,1)";
      target.style.opacity    = "1";
      target.style.transform  = "translateX(0)";
    });
  });

  updateStepIndicator(targetId);
}

function updateStepIndicator(viewId) {
  const indicator = $("stepIndicator");
  if (!indicator) return;
  const wizardViews = ["viewStep1","viewStep2","viewStep3","viewStep4"];
  const stepIndex   = wizardViews.indexOf(viewId); // -1 if not wizard
  if (stepIndex === -1) {
    indicator.classList.add("hidden");
    return;
  }
  indicator.classList.remove("hidden");
  indicator.querySelectorAll(".step-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === stepIndex);
    dot.classList.toggle("done",   i < stepIndex);
  });
  indicator.querySelectorAll(".step-line").forEach((line, i) => {
    line.classList.toggle("done", i < stepIndex);
  });
}

/* =====================================================
   AUTH HELPERS
   ===================================================== */
function getToken()    { return localStorage.getItem(TOKEN_KEY) || ""; }
function authHeaders() { const t = getToken(); return t ? { Authorization: `Bearer ${t}` } : {}; }
function redirectToLogin() { window.location.href = "login.html"; }

async function readErrorMessage(response, fallback) {
  const ct = response.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      const d = await response.json();
      return d?.message ?? JSON.stringify(d);
    }
    return (await response.text()) || fallback;
  } catch { return fallback; }
}

/* =====================================================
   LOAD CURRENT USER
   ===================================================== */
async function loadCurrentUser() {
  const token = getToken();
  if (!token) { redirectToLogin(); return; }
  try {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Unauthorized");
    const user = await res.json();
    currentUser = user;
    updatePlayerChip(user);
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    redirectToLogin();
  }
}

function updatePlayerChip(user) {
  const chip   = $("playerChip");
  const avatar = $("chipAvatar");
  const name   = $("chipName");
  if (!chip) return;
  if (user) {
    if (avatar) avatar.textContent = (user.username || "?")[0].toUpperCase();
    if (name)   name.textContent   = `${user.username}  Lv.${user.level ?? 0}`;
  }
}

/* =====================================================
   LOAD PLAYER PROGRESS
   ===================================================== */
function buildProgressMap(items) {
  const map = new Map();
  (items || []).forEach(item => {
    const field = item?.prepField;
    const topic = item?.topic;
    if (!field || !topic) return;
    if (!map.has(field)) {
      map.set(field, { unlocked: new Set(), cleared: new Set() });
    }
    const entry = map.get(field);
    entry.unlocked.add(topic);
    if (item.cleared) entry.cleared.add(topic);
  });
  return map;
}

async function loadPlayerProgress() {
  const token = getToken();
  if (!token) return;
  progressLoaded = false;
  try {
    const res = await fetch(`${API_BASE}/players/me/progress`, { headers: authHeaders() });
    if (!res.ok) throw new Error(`Progress load failed: ${res.status}`);
    const data = await res.json();
    progressByField = buildProgressMap(Array.isArray(data) ? data : []);
  } catch {
    progressByField = new Map();
  } finally {
    progressLoaded = true;
  }
}

/* =====================================================
   LOGOUT
   ===================================================== */
async function logout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, { method: "POST", headers: authHeaders() });
  } catch { /* ignore */ }
  localStorage.removeItem(TOKEN_KEY);
  redirectToLogin();
}

/* =====================================================
   FETCH & RENDER PLAYERS (Leaderboard)
   ===================================================== */
async function fetchPlayers() {
  const container = $("playersContainer");
  try {
    const res = await fetch(`${API_BASE}/players`);
    if (!res.ok) throw new Error(`${res.status}`);
    const players = await res.json();
    const sorted  = Array.isArray(players)
      ? [...players].sort((a, b) => ((b.xp||0)-(a.xp||0)) || ((b.level||0)-(a.level||0)))
      : [];
    updateStats(sorted);
    renderPlayers(sorted);

    // Refresh current user stats too
    if (currentUser) {
      const updated = sorted.find(p => p.id === currentUser.id);
      if (updated) { currentUser = updated; updatePlayerChip(updated); }
    }
  } catch {
    if (container) container.innerHTML = `<div class="empty">Could not load players.</div>`;
    updateStats([]);
  }
}

function updateStats(players) {
  const total    = players.length;
  const topLevel = players.reduce((max, p) => Math.max(max, p.level ?? 0), 0);
  const tpl = $("totalPlayersLabel");
  const tlv = $("topLevelLabel");
  if (tpl) tpl.textContent = `${total} Player${total !== 1 ? "s" : ""}`;
  if (tlv) tlv.textContent = `Top Level: ${topLevel}`;
}

function renderPlayers(players) {
  const container = $("playersContainer");
  if (!container) return;
  if (!players.length) {
    container.innerHTML = `<div class="empty">No players yet.</div>`;
    return;
  }
  const medals = ["🥇","🥈","🥉"];
  container.innerHTML = players.map((p, i) => {
    const rank  = medals[i] ?? `#${i+1}`;
    const uname = p.username ?? "Unknown";
    const lv    = p.level ?? 0;
    const xp    = p.xp    ?? 0;
    return `
      <div class="player-card" style="animation-delay:${i*0.05}s">
        <div class="player-card-rank">${rank}</div>
        <h3>${uname}</h3>
        <div class="stat">Level <span>${lv}</span></div>
        <div class="stat">XP <span>${xp}</span></div>
      </div>`;
  }).join("");
}

/* =====================================================
   STEP 1 — FIELD SELECTION
   ===================================================== */
function initStep1() {
  const grid = $("fieldGrid");
  if (!grid) return;
  grid.querySelectorAll(".choice-card").forEach(card => {
    card.addEventListener("click", async () => {
      selectedField = card.dataset.value;
      if (!progressLoaded) {
        await loadPlayerProgress();
      }
      buildTopicMap(selectedField);
      showView("viewStep2");
    });
  });
  $("backFromStep1")?.addEventListener("click", () => showView("viewLobby", "back"));
}

/* =====================================================
   STEP 2 — TOPIC SELECTION
   ===================================================== */
function buildTopicMap(field) {
  const grid = $("topicMap");
  if (!grid) return;
  const topics = TOPIC_MAP[field] ?? [];
  const progress = progressByField.get(field);
  const unlocked = progress?.unlocked ?? new Set();
  const cleared  = progress?.cleared ?? new Set();

  grid.innerHTML = topics.map((topic, i) => {
    const isUnlocked = unlocked.has(topic);
    const isCleared = cleared.has(topic);
    const statusLabel = isUnlocked ? (isCleared ? "Cleared" : "Unlocked") : "Locked";
    const statusIcon  = isUnlocked ? (isCleared ? "✅" : "🧭") : "🔒";
    return `
      <button class="map-node ${isUnlocked ? "unlocked" : "locked"} ${isCleared ? "cleared" : ""}"
              data-value="${topic}" type="button" ${isUnlocked ? "" : "disabled"}>
        <div class="node-index">${i + 1}</div>
        <div class="node-body">
          <div class="node-title">${topic}</div>
          <div class="node-status">${statusLabel}</div>
        </div>
        <div class="node-icon">${statusIcon}</div>
      </button>`;
  }).join("");

  grid.querySelectorAll(".map-node").forEach(card => {
    if (card.disabled) return;
    card.addEventListener("click", () => {
      selectedTopic = card.dataset.value;
      showView("viewStep3");
    });
  });
}

function initStep2() {
  $("backFromStep2")?.addEventListener("click", () => showView("viewStep1", "back"));
}

/* =====================================================
   STEP 3 — DIFFICULTY SELECTION
   ===================================================== */
function initStep3() {
  const grid = $("difficultyGrid");
  if (!grid) return;
  grid.querySelectorAll(".choice-card").forEach(card => {
    card.addEventListener("click", () => {
      selectedDifficulty = card.dataset.value;
      updateRunSummary();
      showView("viewStep4");
    });
  });
  $("backFromStep3")?.addEventListener("click", () => showView("viewStep2", "back"));
}

/* =====================================================
   STEP 4 — QUESTION COUNT
   ===================================================== */
const MIN_Q = 1, MAX_Q = 20;

function updateCountDisplay() {
  const disp = $("questionCountDisplay");
  if (disp) disp.textContent = questionCount;
}

function updateRunSummary() {
  const summary = $("runSummary");
  if (!summary) return;
  const fieldLabel = {
    OOP: "OOP", DSA: "DSA",
    OPERATING_SYSTEM: "Operating System", DBMS: "DBMS"
  }[selectedField] ?? selectedField ?? "—";

  summary.innerHTML = [
    ["🧩 Field",      fieldLabel],
    ["📌 Topic",      selectedTopic       ?? "—"],
    ["⚡ Difficulty", selectedDifficulty  ?? "—"],
  ].map(([k,v]) => `<div class="summary-tag">${k}: <strong>${v}</strong></div>`).join("");
}

function initStep4() {
  $("backFromStep4")?.addEventListener("click", () => showView("viewStep3", "back"));

  $("countMinus")?.addEventListener("click", () => {
    if (questionCount > MIN_Q) { questionCount--; updateCountDisplay(); }
  });
  $("countPlus")?.addEventListener("click", () => {
    if (questionCount < MAX_Q) { questionCount++; updateCountDisplay(); }
  });

  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      questionCount = Number(btn.dataset.count);
      updateCountDisplay();
    });
  });

  $("launchRunBtn")?.addEventListener("click", startGame);
}

/* =====================================================
   START GAME (API call — unchanged)
   ===================================================== */
function showLaunchError(msg) {
  const el = $("launchError");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 3000);
}

async function startGame() {
  const playerId = currentUser?.id;
  if (!playerId) { showLaunchError("You must be logged in."); return; }
  if (!selectedField || !selectedTopic) { showLaunchError("Select a field and topic."); return; }
  if (!selectedDifficulty) { showLaunchError("Select a difficulty."); return; }
  if (questionCount < 1)   { showLaunchError("At least 1 question required."); return; }

  const btn = $("launchRunBtn");
  if (btn) btn.disabled = true;

  try {
    const res = await fetch(`${API_BASE}/game/start`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body:    JSON.stringify({
        playerId:        Number(playerId),
        prepField:       selectedField,
        topic:           selectedTopic,
        difficulty:      selectedDifficulty,
        numberOfQuestions: questionCount,
      }),
    });

    if (!res.ok) {
      const msg = await readErrorMessage(res, `Failed to start game: ${res.status}`);
      throw new Error(msg);
    }

    const payload        = await res.json();
    currentSessionId     = payload.sessionId;
    currentQuestions     = Array.isArray(payload.questions) ? payload.questions : [];
    currentQuestionIndex = 0;
    currentHealth        = Number(payload.currentHealth ?? payload.maxHealth ?? 3);
    maxHealth            = Number(payload.maxHealth ?? currentHealth ?? 3);

    if (!currentQuestions.length) {
      showLaunchError("No questions found for this selection. Try a different difficulty or topic.");
      return;
    }

    initGameView();
    showView("viewGame");
  } catch (err) {
    showLaunchError(err.message || "Could not start game.");
  } finally {
    if (btn) btn.disabled = false;
  }
}

/* =====================================================
   GAME VIEW — render questions
   ===================================================== */
function initGameView() {
  // Populate top bar
  const meta = $("gameMeta");
  if (meta) meta.textContent = `${selectedField?.replace("_"," ")} • ${selectedTopic}`;

  const badge = $("diffBadge");
  if (badge) {
    badge.textContent = selectedDifficulty ?? "EASY";
    badge.className   = "diff-badge " + (selectedDifficulty ?? "EASY").toLowerCase();
  }

  setProgress(0, currentQuestions.length);
  renderHealth();

  renderQuestion();
}

function setProgress(answered, total) {
  const fill  = $("progressFill");
  const label = $("progressLabel");
  const pct   = total ? ((answered / total) * 100).toFixed(1) : 0;
  if (fill)  fill.style.width   = `${pct}%`;
  if (label) label.textContent  = `${answered} / ${total}`;
}

function renderHealth() {
  const bar = $("healthBar");
  if (!bar) return;
  const total = Math.max(maxHealth, currentHealth, 0);
  bar.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const heart = document.createElement("span");
    heart.className = "heart" + (i < currentHealth ? "" : " empty");
    heart.textContent = "❤️";
    bar.appendChild(heart);
  }
}

function renderQuestion() {
  if (!currentQuestions.length) return;

  const q      = currentQuestions[currentQuestionIndex];
  const num    = currentQuestionIndex + 1;
  const total  = currentQuestions.length;

  setProgress(currentQuestionIndex, total);

  const qNum = $("qNum");
  const qText = $("qText");
  const opts  = $("optionsContainer");
  const nxt   = $("nextQuestionBtn");

  if (qNum)  qNum.textContent  = `Question ${num} of ${total}`;
  if (qText) qText.textContent = q.description || q.title || "—";

  // ---- Always update the button label first ----
  clearAnswerFeedback();
  if (nxt) {
    nxt.textContent = "Submit Answer";
    nxt.onclick = null;
    nxt.classList.add("hidden");
  }

  if (opts) {
    opts.innerHTML = "";
    const options = Array.isArray(q.options) ? q.options : [];

    if (options.length) {
      options.forEach(opt => {
        const btn = document.createElement("button");
        btn.type         = "button";
        btn.className    = "option-btn";
        btn.textContent  = opt;
        btn.dataset.value = opt;
        btn.addEventListener("click", () => handleOptionAnswer(q, opt, btn));
        opts.appendChild(btn);
      });
    } else {
      const inp = document.createElement("input");
      inp.type        = "text";
      inp.id          = "freeAnswer";
      inp.placeholder = "Type your answer…";
      inp.value       = "";
      inp.style.cssText = "width:100%;padding:12px 16px;border-radius:12px;border:1px solid rgba(61,242,198,0.3);background:rgba(255,255,255,0.06);color:var(--text);font-size:1rem;font-family:inherit;";
      opts.appendChild(inp);

      if (nxt) {
        nxt.textContent = "Submit Answer";
        nxt.onclick = () => handleFreeTextSubmit(q);
        nxt.classList.remove("hidden");
      }
    }
  }
}

function showGameError(msg) {
  const el = $("gameError");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("visible");
  setTimeout(() => el.classList.remove("visible"), 2500);
}

function clearAnswerFeedback() {
  const el = $("answerFeedback");
  if (!el) return;
  el.textContent = "";
  el.className = "feedback-msg";
}

function showAnswerFeedback(isCorrect, correctAnswer) {
  const el = $("answerFeedback");
  if (!el) return;
  if (isCorrect) {
    el.textContent = "Correct!";
    el.className = "feedback-msg correct";
    return;
  }
  const reveal = correctAnswer ? `Correct answer: ${correctAnswer}` : "Wrong answer";
  el.textContent = reveal;
  el.className = "feedback-msg wrong";
}

function setAnswerInputsEnabled(enabled) {
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.disabled = !enabled;
  });
  const free = $("freeAnswer");
  if (free) free.disabled = !enabled;
  const nxt = $("nextQuestionBtn");
  if (nxt) nxt.disabled = !enabled;
}

function handleOptionAnswer(question, answer, button) {
  if (isSubmittingAnswer) return;
  submitSingleAnswer(question, answer, button);
}

function handleFreeTextSubmit(question) {
  if (isSubmittingAnswer) return;
  const inp = $("freeAnswer");
  const answer = inp?.value.trim() ?? "";
  if (!answer) {
    showGameError("Enter an answer to continue.");
    return;
  }
  submitSingleAnswer(question, answer, null);
}

async function submitSingleAnswer(question, answer, selectedBtn) {
  if (!currentSessionId || !currentUser?.id) {
    showGameError("No active session.");
    return;
  }

  isSubmittingAnswer = true;
  setAnswerInputsEnabled(false);

  try {
    const res = await fetch(`${API_BASE}/game/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({
        sessionId: currentSessionId,
        questionId: question.id,
        answer,
      }),
    });

    if (!res.ok) {
      const msg = await readErrorMessage(res, `Failed to submit: ${res.status}`);
      throw new Error(msg);
    }

    const result = await res.json();
    const isCorrect = !!result.correct;
    if (selectedBtn) {
      selectedBtn.classList.add(isCorrect ? "correct" : "wrong");
      if (!isCorrect && result.correctAnswer) {
        const buttons = $("optionsContainer")?.querySelectorAll(".option-btn") || [];
        buttons.forEach(btn => {
          if (btn.dataset.value === result.correctAnswer) {
            btn.classList.add("correct");
          }
        });
      }
    }

    showAnswerFeedback(isCorrect, result.correctAnswer);
    currentHealth = Number(result.currentHealth ?? currentHealth);
    renderHealth();
    setProgress(result.answeredQuestions ?? (currentQuestionIndex + 1), result.totalQuestions ?? currentQuestions.length);

    if (result.sessionStatus === "FAILED") {
      showResults(result.finalResult, "FAILED");
      fetchPlayers();
      await loadPlayerProgress();
      isSubmittingAnswer = false;
      return;
    }
    if (result.sessionStatus === "COMPLETED") {
      showResults(result.finalResult, "COMPLETED");
      fetchPlayers();
      await loadPlayerProgress();
      isSubmittingAnswer = false;
      return;
    }

    currentQuestionIndex++;
    setTimeout(() => {
      renderQuestion();
      setAnswerInputsEnabled(true);
      isSubmittingAnswer = false;
    }, 650);
  } catch (err) {
    showGameError(err.message || "Could not submit answer.");
    setAnswerInputsEnabled(true);
    isSubmittingAnswer = false;
  }
}

/* =====================================================
   RESULTS VIEW
   ===================================================== */
function showResults(result, status = "COMPLETED") {
  result = result || {};
  const score    = result.score            ?? 0;
  const correct  = result.correctAnswers   ?? 0;
  const total    = result.totalQuestions   ?? currentQuestions.length;
  const xpGained = result.xpGained        ?? 0;
  const newXp    = result.newTotalXp       ?? 0;
  const newLevel = result.newLevel         ?? currentUser?.level ?? 0;
  const pct      = total ? Math.round((correct / total) * 100) : 0;

  const failed = status === "FAILED";
  const icon = failed ? "💀" : (pct >= 80 ? "🏆" : pct >= 50 ? "⚡" : "💪");
  const ri   = $("resultsIcon");
  const rs   = $("resultsScore");
  const rt   = $("resultsTitle");
  const card = $("resultsCard");
  if (ri) ri.textContent = icon;
  if (rs) rs.textContent = `${pct}%`;
  if (rt) rt.textContent = failed ? "You Died" : "Run Complete!";
  if (card) card.classList.toggle("failed", failed);

  const statsEl = $("resultsStats");
  if (statsEl) {
    statsEl.innerHTML = [
      ["Correct",   `${correct}/${total}`,       ""],
      ["Score",     score,                        ""],
      ["XP Gained", `+${xpGained}`,              "positive"],
      ["New Level", newLevel,                     "positive"],
    ].map(([label, val, cls]) => `
      <div class="result-stat">
        <div class="result-stat-label">${label}</div>
        <div class="result-stat-value ${cls}">${val}</div>
      </div>`).join("");
  }

  showView("viewResults");
}

/* =====================================================
   LOBBY — "Start a Run" button
   ===================================================== */
function initLobby() {
  const themeToggle = $("themeToggleBtn");
  if (themeToggle) {
    const isLight = localStorage.getItem("theme") === "light";
    if (isLight) {
      document.body.classList.add("light-mode");
      themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const currentIsLight = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", currentIsLight ? "light" : "dark");
      themeToggle.textContent = currentIsLight ? "🌙" : "☀️";
    });
  }

  $("startRunBtn")?.addEventListener("click", async () => {
    // Reset wizard state
    selectedField = selectedTopic = selectedDifficulty = null;
    questionCount = 5;
    updateCountDisplay();
    // Deselect all cards
    document.querySelectorAll(".choice-card").forEach(c => c.classList.remove("selected"));
    await loadPlayerProgress();
    showView("viewStep1");
  });

  $("logoutBtn")?.addEventListener("click", logout);

  $("playAgainBtn")?.addEventListener("click", async () => {
    selectedField = selectedTopic = selectedDifficulty = null;
    questionCount = 5;
    updateCountDisplay();
    document.querySelectorAll(".choice-card").forEach(c => c.classList.remove("selected"));
    await loadPlayerProgress();
    showView("viewStep1");
  });

  $("goLobbyBtn")?.addEventListener("click", () => {
    showView("viewLobby", "back");
  });
}

/* =====================================================
   BOOT
   ===================================================== */
window.addEventListener("DOMContentLoaded", async () => {
  spawnParticles();

  // Only the lobby starts visible; all others are display:none via CSS
  const lobby = $("viewLobby");
  if (lobby) {
    lobby.classList.add("active");
    lobby.style.opacity   = "1";
    lobby.style.transform = "translateX(0)";
  }

  initLobby();
  initStep1();
  initStep2();
  initStep3();
  initStep4();

  await loadCurrentUser();
  await loadPlayerProgress();
  await fetchPlayers();
});
