let session = null;
let questions = [];
let currentIndex = 0;
let health = 3;
let isSubmitting = false;

document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuth();
  if (!user) { window.location.href = "index.html"; return; }

  const storedData = sessionStorage.getItem("current_game");
  if (!storedData) { window.location.href = "dashboard.html"; return; }

  session   = JSON.parse(storedData);
  questions = session.questions || [];
  health    = session.maxHealth || 3;
  document.getElementById("hudMeta").textContent =
    `FIELD: ${session.prepField || "?"} | ZONE: ${session.topic || "?"} | DIFF: ${session.difficulty || "?"}`;

  if (questions.length === 0) {
    showEmptyMission();
    return;
  }
  renderHUD();
  renderQuestion();
});

function showError(msg) {
  const b = document.getElementById("gameError");
  b.textContent = msg;
  b.className = "msg-box error visible";
  setTimeout(() => b.className = "msg-box error", 3000);
}

function showEmptyMission() {
  sessionStorage.removeItem("current_game");
  document.getElementById("qCounter").textContent = "MISSION UNAVAILABLE";
  document.getElementById("qText").textContent =
    "No questions were loaded for this subject, topic, and difficulty.";

  const optsBox = document.getElementById("optionsContainer");
  optsBox.style.gridTemplateColumns = "1fr";
  optsBox.innerHTML = `
    <div class="msg-box error visible" style="display:block; text-align:left;">
      This mission has no seeded questions yet. Return to the hub and choose another mission, or run the missing seed SQL for this topic.
    </div>
    <button type="button" class="cyber-btn" onclick="window.location.href='dashboard.html'">RETURN TO HUB</button>`;

  document.getElementById("feedbackMsg").innerHTML = "";
  renderHUD();
}

function renderHUD() {
  const hb = document.getElementById("healthBar");
  hb.innerHTML = "";
  for (let i = 0; i < (session.maxHealth || 3); i++) {
    hb.innerHTML += `<span class="heart ${i >= health ? 'empty' : ''}">❤️</span>`;
  }
  const pct = questions.length ? (currentIndex / questions.length) * 100 : 0;
  document.getElementById("progFill").style.width = `${pct}%`;
}

function renderQuestion() {
  if (currentIndex >= questions.length) return;

  const q = questions[currentIndex];
  document.getElementById("qCounter").textContent = `Q. ${currentIndex + 1} / ${questions.length}`;
  document.getElementById("qText").textContent     = q.description || q.title || "—";
  document.getElementById("feedbackMsg").innerHTML = "";

  const optsBox = document.getElementById("optionsContainer");
  optsBox.innerHTML = "";

  const isCoding = q.type === "CODING" || !q.options || q.options.length === 0;

  if (!isCoding) {
    // ── MCQ rendering ─────────────────────────────────────────────────────
    optsBox.style.gridTemplateColumns = "1fr 1fr";
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "opt-btn";
      btn.textContent = opt;
      btn.onclick = () => submitAnswer(opt, btn, false);
      optsBox.appendChild(btn);
    });
  } else {
    // ── CODING rendering ──────────────────────────────────────────────────
    optsBox.style.gridTemplateColumns = "1fr";

    // language badge
    const langBadge = document.createElement("div");
    langBadge.style.cssText =
      "color:var(--neon-blue);font-size:0.85rem;margin-bottom:6px;font-family:var(--font-retro);";
    langBadge.textContent = getLanguageHint(session.prepField);
    optsBox.appendChild(langBadge);

    // code editor textarea
    const editor = document.createElement("textarea");
    editor.id = "codeEditor";
    editor.className = "code-editor";
    editor.placeholder = "// Write your answer here...";
    editor.spellcheck = false;
    editor.autocorrect = "off";
    editor.autocapitalize = "off";
    optsBox.appendChild(editor);

    // Tab key support inside textarea
    editor.addEventListener("keydown", e => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, s) + "    " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = s + 4;
      }
    });

    // EXECUTE button
    const execBtn = document.createElement("button");
    execBtn.className = "cyber-btn";
    execBtn.style.cssText = "margin-top:0.8rem; width:100%; font-size:1.1rem; border-color:var(--neon-green); color:var(--neon-green);";
    execBtn.textContent = "▶ EXECUTE CODE";
    execBtn.onclick = () => {
      const val = document.getElementById("codeEditor").value.trim();
      if (!val) { showError("INPUT REQUIRED — Write your code first!"); return; }
      submitAnswer(val, null, true);
    };
    optsBox.appendChild(execBtn);
  }
}

function getLanguageHint(prepField) {
  switch ((prepField || "").toUpperCase()) {
    case "OOP":              return "[ LANGUAGE: Java ]";
    case "DSA":              return "[ LANGUAGE: C++ ]";
    case "DBMS":             return "[ LANGUAGE: SQL ]";
    case "OPERATING_SYSTEM": return "[ LANGUAGE: Bash ]";
    default:                 return "[ WRITE YOUR ANSWER ]";
  }
}

async function submitAnswer(answerVal, btnRef, isCoding) {
  if (isSubmitting) return;
  if (!answerVal || !answerVal.trim()) { showError("INPUT REQUIRED"); return; }

  isSubmitting = true;
  document.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
  const codeEditor = document.getElementById("codeEditor");
  if (codeEditor) codeEditor.disabled = true;

  try {
    const res = await apiCall("/game/answer", "POST", {
      sessionId:  session.sessionId,
      questionId: questions[currentIndex].id,
      answer:     answerVal.trim()
    });

    const correct = !!res.correct;
    const fb = document.getElementById("feedbackMsg");

    if (correct) {
      fb.innerHTML = `<span style="color:var(--neon-green)">✔ CRITICAL HIT!</span>`;
      if (btnRef) btnRef.classList.add("correct");
      if (codeEditor) codeEditor.style.borderColor = "var(--neon-green)";
    } else {
      const correctAns = res.correctAnswer || "";
      if (isCoding) {
        // For coding questions: show expected answer in a formatted block
        fb.innerHTML = `
          <div style="color:var(--neon-red);font-size:1.1rem;margin-bottom:8px;">✘ DAMAGE TAKEN!</div>
          <div style="color:#aaa;font-size:0.9rem;margin-bottom:4px;">EXPECTED ANSWER:</div>
          <pre style="background:#1a0010;border:1px solid var(--neon-red);padding:10px;border-radius:4px;
                      font-family:monospace;font-size:0.95rem;color:#ffb3b3;text-align:left;
                      white-space:pre-wrap;word-break:break-all;">${escapeHtml(correctAns)}</pre>`;
        if (codeEditor) codeEditor.style.borderColor = "var(--neon-red)";
      } else {
        fb.innerHTML = `<span style="color:var(--neon-red)">✘ DAMAGE TAKEN! &nbsp; Correct: <em>${escapeHtml(correctAns)}</em></span>`;
        if (btnRef) btnRef.classList.add("wrong");
        // highlight the correct option button
        document.querySelectorAll(".opt-btn").forEach(b => {
          if (b.textContent === correctAns) b.classList.add("correct");
        });
      }
      health = res.currentHealth !== undefined ? res.currentHealth : health - 1;
    }

    renderHUD();

    if (res.sessionStatus === "FAILED" || res.sessionStatus === "COMPLETED") {
      setTimeout(() => showEndScreen(res.finalResult, res.sessionStatus), isCoding ? 2500 : 1500);
      return;
    }

    currentIndex++;
    setTimeout(() => {
      isSubmitting = false;
      renderQuestion();
    }, isCoding ? 2500 : 1500);

  } catch (err) {
    showError(err.message);
    isSubmitting = false;
    document.querySelectorAll(".opt-btn").forEach(b => b.disabled = false);
    if (codeEditor) codeEditor.disabled = false;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showEndScreen(result, status) {
  const screen = document.getElementById("endScreen");
  const title  = document.getElementById("endTitle");
  screen.classList.remove("hidden");

  const correctAnswers = result?.correctAnswers || 0;
  const total = result?.totalQuestions || questions.length;
  const pct   = total ? Math.round((correctAnswers / total) * 100) : 0;

  if (status === "FAILED") {
    title.textContent    = "MISSION FAILED";
    title.style.color    = "var(--neon-red)";
  } else {
    title.textContent    = "MISSION ACCOMPLISHED";
    title.style.color    = "var(--neon-green)";
  }

  document.getElementById("endScore").textContent = pct;
  document.getElementById("endScore").style.color = status === "FAILED" ? "var(--neon-red)" : "var(--neon-green)";
  document.getElementById("endXp").textContent    = result?.xpGained || 0;
  document.getElementById("endLvl").textContent   = result?.newLevel || session.level || 0;
}