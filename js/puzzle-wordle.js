// ============================
// PUZZLE 3: WORDLE (EXPERIENCE)
// ============================
let wordleWord = 'ANALYST';
let wordleAttempts = [];
const wordleMaxGuesses = 6;

function initWordle() {
  const input = document.getElementById('wordle-input');
  if (!input) return;
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') checkWordleGuess();
  });
}

function checkWordleGuess() {
  const input = document.getElementById('wordle-input');
  const guess = input.value.toUpperCase().trim();
  const feedbackEl = document.getElementById('wordle-feedback');
  
  // Validation
  if (!guess) {
    feedbackEl.textContent = '❌ Please enter a word';
    feedbackEl.style.color = '#e74c3c';
    return;
  }

  if (guess.length !== 7) {
    feedbackEl.textContent = '❌ Word must be 7 letters!';
    feedbackEl.style.color = '#e74c3c';
    return;
  }

  if (wordleAttempts.includes(guess)) {
    feedbackEl.textContent = '⚠️ Already guessed that word!';
    feedbackEl.style.color = '#f39c12';
    return;
  }

  wordleAttempts.push(guess);
  
  // Check if correct
  if (guess === wordleWord) {
    feedbackEl.innerHTML = '✅ CORRECT! Section unlocked!';
    feedbackEl.style.color = '#27ae60';
    input.disabled = true;
    document.getElementById('wordle-submit').disabled = true;
    
    // Show custom popup
    showSuccessPopup(
      '🔓 PUZZLE UNLOCKED',
      'You have unlocked the next puzzle! Try to solve it to learn about the suspect\'s experience, projects, and technical arsenal.',
      'EXPERIENCE'
    );
    
    setTimeout(() => unlockSection('experience'), 1000);
    return;
  }

  // Display feedback
  const feedback = getWordleFeedback(guess);
  displayWordleAttempt(guess, feedback);

  // Check if game over
  if (wordleAttempts.length >= wordleMaxGuesses) {
    feedbackEl.innerHTML = `❌ Game over! The word was: <strong>${wordleWord}</strong>`;
    feedbackEl.style.color = '#c0392b';
    input.disabled = true;
    document.getElementById('wordle-submit').disabled = true;
    return;
  }

  // Show remaining attempts
  const remaining = wordleMaxGuesses - wordleAttempts.length;
  feedbackEl.textContent = `❌ Wrong! ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`;
  feedbackEl.style.color = '#e74c3c';
  
  input.value = '';
  input.focus();
}

function getWordleFeedback(guess) {
  return guess.split('').map((letter, i) => {
    if (letter === wordleWord[i]) return { letter, status: 'correct' };
    if (wordleWord.includes(letter)) return { letter, status: 'present' };
    return { letter, status: 'absent' };
  });
}

function displayWordleAttempt(guess, feedback) {
  const container = document.getElementById('wordle-history');
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '4px';
  row.style.marginBottom = '8px';

  feedback.forEach(({ letter, status }) => {
    const tile = document.createElement('div');
    tile.textContent = letter;
    tile.style.width = '40px';
    tile.style.height = '40px';
    tile.style.display = 'flex';
    tile.style.alignItems = 'center';
    tile.style.justifyContent = 'center';
    tile.style.fontFamily = '"Bebas Neue", sans-serif';
    tile.style.fontSize = '18px';
    tile.style.fontWeight = 'bold';
    tile.style.border = '2px solid var(--aged)';
    tile.style.borderRadius = '4px';
    
    if (status === 'correct') {
      tile.style.background = '#27ae60';
      tile.style.color = '#fff';
      tile.style.borderColor = '#27ae60';
    } else if (status === 'present') {
      tile.style.background = '#f39c12';
      tile.style.color = '#fff';
      tile.style.borderColor = '#f39c12';
    } else {
      tile.style.background = '#bdc3c7';
      tile.style.color = '#666';
      tile.style.borderColor = '#bdc3c7';
    }
    
    row.appendChild(tile);
  });

  container.appendChild(row);
}

function showSuccessPopup(title, message, section) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '10000';
  
  // Create popup
  const popup = document.createElement('div');
  popup.style.background = '#f5f1e8';
  popup.style.border = '3px solid #1a1208';
  popup.style.borderRadius = '8px';
  popup.style.padding = '30px';
  popup.style.maxWidth = '500px';
  popup.style.textAlign = 'center';
  popup.style.fontFamily = '"Special Elite", cursive';
  popup.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
  
  // Title
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  titleEl.style.color = '#27ae60';
  titleEl.style.marginBottom = '15px';
  titleEl.style.fontSize = '28px';
  titleEl.style.fontWeight = 'bold';
  
  // Message
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  messageEl.style.color = '#1a1208';
  messageEl.style.marginBottom = '25px';
  messageEl.style.fontSize = '16px';
  messageEl.style.lineHeight = '1.6';
  
  // Section hint
  const sectionEl = document.createElement('p');
  sectionEl.textContent = `Next Section: ${section}`;
  sectionEl.style.color = '#6a5a3a';
  sectionEl.style.marginBottom = '25px';
  sectionEl.style.fontSize = '14px';
  sectionEl.style.fontStyle = 'italic';
  
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'CONTINUE';
  closeBtn.style.padding = '12px 30px';
  closeBtn.style.background = '#27ae60';
  closeBtn.style.color = '#fff';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '4px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontFamily = '"Bebas Neue", sans-serif';
  closeBtn.style.fontSize = '16px';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.transition = 'background 0.3s';
  
  closeBtn.onmouseover = () => closeBtn.style.background = '#229954';
  closeBtn.onmouseout = () => closeBtn.style.background = '#27ae60';
  closeBtn.onclick = () => {
    overlay.remove();
  };
  
  popup.appendChild(titleEl);
  popup.appendChild(messageEl);
  popup.appendChild(sectionEl);
  popup.appendChild(closeBtn);
  overlay.appendChild(popup);
  
  document.body.appendChild(overlay);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initWordle);