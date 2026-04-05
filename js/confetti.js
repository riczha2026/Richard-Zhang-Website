// ============================
// CONFETTI ANIMATION
// ============================
function launchConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  
  container.innerHTML = '';
  const colors = ['#c0392b', '#b8860b', '#4a8a4a', '#f0e8d0', '#d4c4a0'];
  
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    const delay = Math.random() * 0.5;
    const duration = 2 + Math.random() * 2;
    const x = Math.random() * 100;
    const rotation = Math.random() * 720;
    
    confetti.style.cssText = `
      position: fixed;
      left: ${x}vw;
      top: -10px;
      width: ${5 + Math.random() * 10}px;
      height: ${5 + Math.random() * 10}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 10000;
      opacity: 0.8;
    `;
    
    // Use keyframe animation via inline style
    const keyframes = `
      @keyframes fall${i} {
        to {
          transform: translateY(100vh) rotate(${rotation}deg);
          opacity: 0;
        }
      }
    `;
    
    confetti.style.animation = `fall${i} ${duration}s linear ${delay}s forwards`;
    
    // Add keyframes to a style element
    if (i === 0) {
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
    
    container.appendChild(confetti);
  }
}

// ============================
// RESET CASE
// ============================
function resetCase() {
  // Reset all unlocked states
  unlocked.education = false;
  unlocked.experience = false;
  unlocked.projects = false;
  unlocked.skills = false;
  solvedCount = 0;
  
  // Reset progress bar
  const progressBar = document.getElementById('solve-progress');
  if (progressBar) progressBar.style.width = '0%';
  
  // Reset all badges and gates
  ['education', 'experience', 'projects', 'skills'].forEach(name => {
    const gate = document.getElementById('gate-' + name);
    const content = document.getElementById('content-' + name);
    const badge = document.getElementById('badge-' + name);
    const tab = document.getElementById('tab-' + name);
    
    if (gate) gate.style.display = 'block';
    if (content) content.style.display = 'none';
    if (badge) { 
      badge.textContent = 'CLASSIFIED'; 
      badge.style.color = 'var(--gold)'; 
      badge.style.borderColor = 'var(--gold)'; 
    }
    if (tab) { 
      tab.classList.add('locked'); 
      tab.textContent = '🔒 ' + name.charAt(0).toUpperCase() + name.slice(1); 
    }
  });
  
  // Reset cipher input
  const cipherInput = document.getElementById('cipher-input');
  if (cipherInput) {
    cipherInput.value = '';
    const cipherFeedback = document.getElementById('cipher-feedback');
    if (cipherFeedback) cipherFeedback.textContent = '';
  }
  
  // Reinit all puzzles if functions exist
  if (typeof initWordle === 'function') initWordle();
  if (typeof initBugGame === 'function') initBugGame();
  if (typeof initMemory === 'function') initMemory();
  
  // Go back to intro screen
  showScreen('intro-screen');
}
