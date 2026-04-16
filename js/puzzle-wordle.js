// ============================
// PUZZLE 3: WORDLE (EXPERIENCE)
// ============================
let wordleWord = 'ANALYST';
let wordleAttempts = [];
const wordleMaxGuesses = 6;
const wordleDefinition = 'A professional who examines data and information to draw conclusions';

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
    
    showSuccessPopup(
      '🎯 IDENTITY VERIFIED',
      'You have unlocked the operational history and discovered the suspect\'s professional background and achievements.',
      'EXPERIENCE',
      '#27ae60'
    );
    
    setTimeout(() => unlockSection('experience'), 1000);
    return;
  }

  // Display feedback
  const feedback = getWordleFeedback(guess);
  displayWordleAttempt(guess, feedback);

  // Show hint after 2 attempts
  if (wordleAttempts.length === 2) {
    feedbackEl.innerHTML = `💡 <strong>Hint:</strong> ${wordleDefinition}`;
    feedbackEl.style.color = '#3498db';
    return;
  }

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', initWordle);