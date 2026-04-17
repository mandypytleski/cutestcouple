const supabaseUrl = "https://mboddoezgkpmzqnwypcs.supabase.co";
const supabaseKey = "sb_publishable_4RRfiDAs6WR5ei269O6sbg_FqHGIt95";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const container = document.getElementById("countdown-container");


let deleteId = null;

const modal = document.getElementById("deleteModal");
const cancelBtn = document.getElementById("cancelDelete");
const confirmBtn = document.getElementById("confirmDelete");

// 🧠 Handles recurring logic cleanly
function getAdjustedDate(baseDate, recurring) {
  const now = new Date();
  let target = new Date(baseDate);

  if (recurring) {
    target.setFullYear(now.getFullYear());

    if (target < now) {
      target.setFullYear(now.getFullYear() + 1);
    }
  }

  return target;
}


// 🔁 Load + sort countdowns
async function loadCountdowns() {
  const { data, error } = await supabaseClient
    .from("countdowns")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  const now = new Date();

  const enriched = data.map(item => {
    const targetDate = getAdjustedDate(item.date, item.recurring);

    return {
      ...item,
      targetDate,
      isPast: !item.recurring && targetDate < now
    };
  });

  // ✅ Proper sorting
  enriched.sort((a, b) => {
    if (a.isPast && !b.isPast) return 1;
    if (!a.isPast && b.isPast) return -1;
    return a.targetDate - b.targetDate;
  });

  container.innerHTML = "";

  enriched.forEach(item => {
  const col = document.createElement("div");
  col.className = "col-md-4";

  col.innerHTML = `
    <div class="countdown-card p-4 position-relative">
      
      <button class="delete-btn" data-id="${item.id}">&times;</button>

      <h4>${item.title}</h4>
      <p class="countdown"
        data-date="${item.date}"
        data-recurring="${item.recurring}">
      </p>

      ${item.isPast ? "<small style='opacity:.6;'>Past</small>" : ""}
    </div>
  `;

  container.appendChild(col);
});

updateCountdowns();
}


// ⏱️ Update countdown timers
function updateCountdowns() {
  const elements = document.querySelectorAll(".countdown");

  elements.forEach(el => {
    const recurring = el.dataset.recurring === "true";
    const baseDate = el.dataset.date;

    const targetDate = getAdjustedDate(baseDate, recurring);

    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0 && !recurring) {
      el.innerHTML = "It's here! 🎉";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    el.innerHTML = `${days}d ${hours}h ${minutes}m`;
  });
}


// ➕ Add new countdown
document.getElementById("addCountdownBtn").addEventListener("click", async () => {
  const title = document.getElementById("countdownTitle").value.trim();
  const date = document.getElementById("countdownDate").value;
  const recurring = document.getElementById("isRecurring").checked;

  if (!title || !date) {
    alert("Please fill out all fields.");
    return;
  }

  const { error } = await supabaseClient
    .from("countdowns")
    .insert([{ title, date, recurring }]);

  if (error) {
    console.error(error);
    alert("Error adding countdown.");
    return;
  }

  loadCountdowns();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteId = e.target.dataset.id;
    modal.classList.remove("hidden");
  }
});
cancelBtn.addEventListener("click", () => {
  deleteId = null;
  modal.classList.add("hidden");
});

confirmBtn.addEventListener("click", async () => {
  if (!deleteId) return;

  const { error } = await supabaseClient
    .from("countdowns")
    .delete()
    .eq("id", deleteId);

  if (error) {
    console.error(error);
    alert("Error deleting countdown.");
    return;
  }

  deleteId = null;
  modal.classList.add("hidden");
  loadCountdowns();
});

// 🚀 Initial load
loadCountdowns();

// 🔁 Update every minute
setInterval(updateCountdowns, 60000);