for (let i = 0; i < 30; i++) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti-piece';
  confetti.style.left = Math.random() * window.innerWidth + 'px';
  confetti.style.top = Math.random() * -100 + 'px';
  document.body.appendChild(confetti);
}
