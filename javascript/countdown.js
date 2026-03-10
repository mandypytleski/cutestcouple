const revealDate = new Date("march 5, 2026 00:00:00").getTime();

  const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = revealDate - now;

if (distance < 0) {
  clearInterval(countdown);

  document.getElementById("countdown").innerHTML = `
    <p class="mb-3">It's time 💙</p>
    <button id="enterBtn" class="btn btn-primary px-4 py-2">
      Open Your Surprise 🎁
    </button>
  `;

  // Optional: add click action for the new button
  document.getElementById("enterBtn").addEventListener("click", function() {
    window.location.href = "index.html";
  });

  return;
}

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  }, 1000);