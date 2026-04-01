let watchList = JSON.parse(localStorage.getItem("watchList")) || [];

function renderList() {
  const container = document.getElementById("watch-list");
  container.innerHTML = "";

  watchList.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="watch-card">
        <p class="watch-text ${item.done ? "completed" : ""}">
          ${item.text}
        </p>
        <button class="check-btn" onclick="toggleItem(${index})">
          ${item.done ? "✅" : "⬜"}
        </button>
      </div>
    `;

    container.appendChild(col);
  });
}

function addItem() {
  const input = document.getElementById("watchInput");
  const text = input.value.trim();

  if (!text) return;

  watchList.push({ text: text, done: false });
  localStorage.setItem("watchList", JSON.stringify(watchList));

  input.value = "";
  renderList();
}

function toggleItem(index) {
  watchList[index].done = !watchList[index].done;
  localStorage.setItem("watchList", JSON.stringify(watchList));
  renderList();

  // Trigger confetti only when marking as completed
  if (watchList[index].done) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// load on start
renderList();