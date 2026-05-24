const TOPICS = {
  OOP: ["Classes", "Inheritance", "Polymorphism", "Encapsulation"],
  DSA: ["Arrays", "Linked List", "Stack", "Queue", "Tree", "Graph"],
  OPERATING_SYSTEM: ["Bash Script", "Process", "Thread", "Memory Management"],
  DBMS: ["SQL Basics", "Normalization", "Indexing", "Transactions"],
};

let currentUser = null;

document.addEventListener("DOMContentLoaded", async () => {
  currentUser = await checkAuth();
  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  // Update Top Nav
  document.getElementById("playerName").textContent = currentUser.username;
  document.getElementById("playerLvl").textContent = `LVL ${currentUser.level || 0}`;

  loadLeaderboard();

  // Setup levels
  const levelsContainer = document.getElementById("levelsContainer");
  const msgBox = document.getElementById("gameError");

  function showError(msg) {
      msgBox.textContent = msg;
      msgBox.classList.add("visible");
      setTimeout(() => msgBox.classList.remove("visible"), 3000);
  }

  // Render all topics as unlocked playable nodes
  let cardsHTML = '';
  for (const field in TOPICS) {
      TOPICS[field].forEach(topic => {
          // They are totally unlocked!
          cardsHTML += `
          <div class="level-card">
              <div class="level-badge">UNLOCKED</div>
              <div class="field-name">${field.replace("_", " ")}</div>
              <div class="topic-name">${topic}</div>
              <button class="cyber-btn" onclick="launchMission('${field}', '${topic}')" style="width:100%; border-color:var(--neon-blue); color:var(--neon-blue);">
                 DEPLOY
              </button>
          </div>
          `;
      });
  }
  levelsContainer.innerHTML = cardsHTML;

  window.launchMission = async function(field, topic) {
      const count = parseInt(document.getElementById("qCount").value);

      if (isNaN(count) || count < 1) {
          showError("ROUTING ERROR: Invalid Enemy Count.");
          return;
      }

      try {
          const payload = {
              prepField: field,
              topic: topic,
              numberOfQuestions: count
          };

          const res = await apiCall("/game/start", "POST", payload);
          sessionStorage.setItem("current_game", JSON.stringify(res));
          window.location.href = "arena.html";

      } catch (err) {
          showError(`SYSTEM FAILURE: ${err.message}`);
      }
  };
});

async function loadLeaderboard() {
  const container = document.getElementById("leaderboardList");
  try {
      const players = await apiCall("/players");
      if (!Array.isArray(players) || players.length === 0) {
          container.innerHTML = '<div class="text-center mt-1 text-muted">No combatants found.</div>';
          return;
      }

      // Sort by XP then Level
      players.sort((a, b) => (b.xp || 0) - (a.xp || 0));

      container.innerHTML = players.map((p, index) => {
          let extraClass = index === 0 ? "top-1" : index === 1 ? "top-2" : index === 2 ? "top-3" : "";
          let prefix = index < 3 ? ["👑", "🥈", "🥉"][index] : `#${index + 1}`;
          
          return `
          <div class="lb-row ${extraClass}">
              <span>${prefix} ${p.username}</span>
              <span>Lv.${p.level || 0} (${p.xp || 0} XP)</span>
          </div>
          `;
      }).join('');
      
  } catch (e) {
      container.innerHTML = '<div class="text-center mt-1 text-danger">Network Error</div>';
  }
}