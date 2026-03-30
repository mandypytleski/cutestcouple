let bucketList = JSON.parse(localStorage.getItem("bucketList")) || [];

function renderList() {
  const container = document.getElementById("bucket-list");
  container.innerHTML = "";

  bucketList.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="bucket-card">
        <p class="bucket-text ${item.done ? "completed" : ""}">
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
  const input = document.getElementById("bucketInput");
  const text = input.value.trim();

  if (!text) return;

  bucketList.push({ text: text, done: false });
  localStorage.setItem("bucketList", JSON.stringify(bucketList));

  input.value = "";
  renderList();
}

function toggleItem(index) {
  bucketList[index].done = !bucketList[index].done;
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
  renderList();

  // Trigger confetti only when marking as completed
  if (bucketList[index].done) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// load on start
renderList();