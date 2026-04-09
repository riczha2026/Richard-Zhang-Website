// ============================
// PUZZLE 3: WORDLE (EXPERIENCE)
// ============================
let wordleWord = 'SOFTWARE';
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
  const input = document.getElementById('wordle-input').value.toUpperCase();
  
  if (input.length !== 7) {  // Change from 8 to 7
    document.getElementById('wordle-feedback').textContent = '❌ Word must be 7 letters!';
    return;
  }

  if (wordleAttempts.includes(guess)) {
    showNotification('Already guessed that!', 'error');
    return;
  }

  wordleAttempts.push(guess);
  
  if (guess === wordleWord) {
    document.getElementById('wordle-feedback').innerHTML = '✅ Correct! You solved it!';
    document.getElementById('wordle-feedback').style.color = '#4a8a4a';
    input.disabled = true;
    document.getElementById('wordle-submit').disabled = true;
    setTimeout(() => unlockSection('experience'), 600);
    return;
  }

  const feedback = getWordleFeedback(guess);
  displayWordleAttempt(guess, feedback);

  if (wordleAttempts.length >= wordleMaxGuesses) {
    document.getElementById('wordle-feedback').innerHTML = `❌ Game over! The word was: <strong>${wordleWord}</strong>`;
    document.getElementById('wordle-feedback').style.color = 'var(--red)';
    input.disabled = true;
    document.getElementById('wordle-submit').disabled = true;
    return;
  }

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
  row.style.marginBottom = '4px';

  feedback.forEach(({ letter, status }) => {
    const tile = document.createElement('div');
    tile.textContent = letter;
    tile.style.width = '36px';
    tile.style.height = '36px';
    tile.style.display = 'flex';
    tile.style.alignItems = 'center';
    tile.style.justifyContent = 'center';
    tile.style.fontFamily = '"Bebas Neue", sans-serif';
    tile.style.fontSize = '16px';
    tile.style.fontWeight = 'bold';
    tile.style.border = '2px solid var(--aged)';
    
    if (status === 'correct') {
      tile.style.background = '#4a8a4a';
      tile.style.color = '#fff';
      tile.style.borderColor = '#4a8a4a';
    } else if (status === 'present') {
      tile.style.background = '#b8860b';
      tile.style.color = '#fff';
      tile.style.borderColor = '#b8860b';
    } else {
      tile.style.background = '#d0d0d0';
      tile.style.color = '#666';
      tile.style.borderColor = '#d0d0d0';
    }
    
    row.appendChild(tile);
  });

  container.appendChild(row);
}