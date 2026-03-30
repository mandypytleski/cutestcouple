function updateCountdowns() {
  const elements = document.querySelectorAll(".countdown");

  elements.forEach(el => {
    const targetDate = new Date(el.getAttribute("data-date"));
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

// update every minute
setInterval(updateCountdowns, 60000);

// run immediately
updateCountdowns();