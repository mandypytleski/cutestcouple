const supabaseUrl = "https://mboddoezgkpmzqnwypcs.supabase.co";
const supabaseKey = "sb_publishable_4RRfiDAs6WR5ei269O6sbg_FqHGIt95";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
const container = document.getElementById("countdown-container");


  async function loadCountdowns() {
  const { data, error } = await supabaseClient
    .from("countdowns")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  // 🧠 STEP 1: compute next occurrence date for each item
  const enriched = data.map(item => {
    const nextDate = item.recurring
      ? getNextDate(item.month, item.day)
      : new Date(item.date);

    return {
      ...item,
      nextTimestamp: nextDate.getTime()
    };
  });

  // 🧠 STEP 2: sort by closest date
  enriched.sort((a, b) => a.nextTimestamp - b.nextTimestamp);

  container.innerHTML = "";

  enriched.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="countdown-card p-4">
        <h4>${item.title}</h4>
        <p class="countdown"
          data-month="${item.month}"
          data-day="${item.day}"
          data-recurring="${item.recurring}">
        </p>
      </div>
    `;

    container.appendChild(col);
  });

  updateCountdowns();
}

  function updateCountdowns() {
    const elements = document.querySelectorAll(".countdown");

    elements.forEach(el => {
      const month = parseInt(el.dataset.month);
      const day = parseInt(el.dataset.day);
      const recurring = el.dataset.recurring === "true";

      let targetDate = recurring
        ? getNextDate(month, day)
        : new Date(el.dataset.date);

      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        el.innerHTML = "It's here! 🎉";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      el.innerHTML = `${days}d ${hours}h ${minutes}m`;
    });
  }

  function getNextDate(month, day) {
    const now = new Date();
    let year = now.getFullYear();

    let next = new Date(year, month - 1, day);

    if (next < now) {
      next = new Date(year + 1, month - 1, day);
    }

    return next;
  }

  document.getElementById("addCountdownBtn").addEventListener("click", async () => {
    const title = document.getElementById("countdownTitle").value.trim();
    const month = parseInt(document.getElementById("countdownMonth").value);
    const day = parseInt(document.getElementById("countdownDay").value);
    const recurring = document.getElementById("isRecurring").checked;

    if (!title || !month || !day) {
      alert("Please fill out all fields.");
      return;
    }

    const { error } = await supabaseClient
      .from("countdowns")
      .insert([{ title, month, day, recurring }]);

    if (error) {
      console.error(error);
      alert("Error adding countdown.");
      return;
    }

    loadCountdowns();
  });

  // initial load
  loadCountdowns();

  // update every minute
  setInterval(updateCountdowns, 60000);

