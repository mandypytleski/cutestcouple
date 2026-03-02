
  document.getElementById("confettiBtn").addEventListener("click", function() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  });