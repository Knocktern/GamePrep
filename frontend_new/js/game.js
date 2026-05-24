let session = null;
let questions = [];
let currentIndex = 0;
let health = 3;
let isSubmitting = false;

document.addEventListener("DOMContentLoaded", async () => {
  const user = await checkAuth();
  if (!user) {
      window.location.href = "index.html";
      return;
  }

  const storedData = sessionStorage.getItem("current_game");
  if (!storedData) {
      window.location.href = "dashboard.html";
      return;
  }

  session = JSON.parse(storedData);
  questions = session.questions || [];
  health = session.maxHealth || 3;
  document.getElementById("hudMeta").textContent = `FIELD: ${session.prepField || "?"} | ZONE: ${session.topic || "?"}`;
  
  if (questions.length === 0) {
      showError("CRITICAL ERROR: No questions loaded.");
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
    
    document.getElementById("qCounter").textContent = `Q. ${currentIndex + 1} / ${questions.length}`;
    const q = questions[currentIndex];
    document.getElementById("qText").textContent = q.description || q.title || "—";
    
    const optsBox = document.getElementById("optionsContainer");
    optsBox.innerHTML = "";
    document.getElementById("feedbackMsg").textContent = "";
    
    if (q.options && q.options.length) {
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.textContent = opt;
            btn.onclick = () => submitAnswer(opt, btn);
            optsBox.appendChild(btn);
        });
    } else {
        const inp = document.createElement("input");
        inp.className = "cyber-input";
        inp.placeholder = "Enter exact syntax...";
        inp.id = "freeAnswer";
        optsBox.appendChild(inp);
        
        const sb = document.createElement("button");
        sb.className = "cyber-btn";
        sb.textContent = "EXECUTE";
        sb.onclick = () => submitAnswer(document.getElementById("freeAnswer").value, null);
        optsBox.appendChild(sb);
    }
}

async function submitAnswer(answerVal, btnRef) {
    if (isSubmitting) return;
    if (!answerVal) {
        showError("INPUT REQUIRED");
        return;
    }
    
    isSubmitting = true;
    document.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
    
    try {
        const payload = {
            sessionId: session.sessionId,
            questionId: questions[currentIndex].id,
            answer: answerVal
        };
        
        const res = await apiCall("/game/answer", "POST", payload);
        const correct = !!res.correct;
        
        const fb = document.getElementById("feedbackMsg");
        if (correct) {
            fb.textContent = "CRITICAL HIT!";
            fb.style.color = "var(--neon-green)";
            if (btnRef) btnRef.classList.add("correct");
        } else {
            fb.textContent = `DAMAGE TAKEN! Correct answer: ${res.correctAnswer || ""}`;
            fb.style.color = "var(--neon-red)";
            if (btnRef) btnRef.classList.add("wrong");
            health = res.currentHealth !== undefined ? res.currentHealth : health - 1;
        }

        renderHUD();

        if (res.sessionStatus === "FAILED" || res.sessionStatus === "COMPLETED") {
            setTimeout(() => showEndScreen(res.finalResult, res.sessionStatus), 1500);
            return;
        }

        currentIndex++;
        setTimeout(() => {
            isSubmitting = false;
            renderQuestion();
        }, 1500);

    } catch (err) {
        showError(err.message);
        isSubmitting = false;
        document.querySelectorAll(".opt-btn").forEach(b => b.disabled = false);
    }
}

function showEndScreen(result, status) {
    const screen = document.getElementById("endScreen");
    const title = document.getElementById("endTitle");
    
    screen.classList.remove("hidden");
    
    const score = result?.score || 0;
    const correctAnswers = result?.correctAnswers || 0;
    const total = result?.totalQuestions || questions.length;
    const pct = total ? Math.round((correctAnswers / total) * 100) : 0;
    
    if (status === "FAILED") {
        title.textContent = "MISSION FAILED";
        title.style.color = "var(--neon-red)";
    } else {
        title.textContent = "MISSION ACCOMPLISHED";
        title.style.color = "var(--neon-green)";
    }
    
    document.getElementById("endScore").textContent = pct;
    document.getElementById("endScore").style.color = status === "FAILED" ? "var(--neon-red)" : "var(--neon-green)";
    document.getElementById("endXp").textContent = result?.xpGained || 0;
    document.getElementById("endLvl").textContent = result?.newLevel || session.level || 0;
}