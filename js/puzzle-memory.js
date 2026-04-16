// ============================
// PUZZLE 5: MEMORY MATCH (SKILLS)
// ============================
const skillPairs = [
  ['Python', 'Programming Language'],
  ['scikit-learn', 'ML Library'],
  ['Streamlit', 'Dashboard Tool'],
  ['SQL', 'Data Query Language'],
  ['Plotly', 'Visualization Library'],
  ['Pandas', 'Data Analysis Library']
];

let flipped = [];
let matched = [];
let moves = 0;

function initMemoryPuzzle() {
  const grid = document.getElementById('memory-grid');
  if (!grid) return;
  
  const shuffled = [...skillPairs].sort(() => Math.random() - 0.5).flat();
  grid.innerHTML = '';
  
  shuffled.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.textContent = '?';
    card.dataset.index = index;
    card.dataset.pair = Math.floor(index / 2);
    card.dataset.skill = skill;
    card.style.width = '100px';
    card.style.height = '100px';
    card.style.background = '#d4c4a0';
    card.style.border = '2px solid #1a1208';
    card.style.borderRadius = '4px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.cursor = 'pointer';
    card.style.fontSize = '14px';
    card.style.fontWeight = 'bold';
    card.style.fontFamily = '"Courier Prime", monospace';
    card.style.userSelect = 'none';
    card.style.transition = 'all 0.3s';
    
    card.onclick = () => flipCard(card);
    grid.appendChild(card);
  });
  
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
  grid.style.gap = '8px';
}

function flipCard(card) {
  if (card.textContent !== '?' || flipped.length > 1 || matched.includes(card.dataset.pair)) {
    return;
  }
  
  card.textContent = card.dataset.skill;
  card.style.background = '#f5f1e8';
  card.style.color = '#1a1208';
  flipped.push(card);
  
  if (flipped.length === 2) {
    moves++;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  const feedback = document.getElementById('memory-feedback');
  
  if (card1.dataset.pair === card2.dataset.pair) {
    feedback.textContent = `✅ Match found! (${Math.floor(matched.length / 2 + 1)}/6)`;
    feedback.style.color = '#27ae60';
    matched.push(card1.dataset.pair, card2.dataset.pair);
    card1.style.background = '#27ae60';
    card2.style.background = '#27ae60';
    card1.style.color = '#fff';
    card2.style.color = '#fff';
    card1.style.cursor = 'default';
    card2.style.cursor = 'default';
    flipped = [];
    
    if (matched.length === skillPairs.length * 2) {
      setTimeout(() => {
        feedback.innerHTML = `🎯 Perfect! All pairs matched in ${moves} moves!`;
        feedback.style.color = '#27ae60';
        feedback.style.fontWeight = 'bold';
        
        showSuccessPopup(
          '🧠 MEMORY UNLOCKED',
          'You have matched all skill pairs and gained access to the suspect\'s complete technical arsenal.',
          'SKILLS',
          '#3498db'
        );
        
        setTimeout(() => unlockSection('skills'), 1000);
      }, 600);
    }
  } else {
    feedback.textContent = `❌ No match. Try again! (${moves} moves)`;
    feedback.style.color = '#e74c3c';
    setTimeout(() => {
      card1.textContent = '?';
      card2.textContent = '?';
      card1.style.background = '#d4c4a0';
      card2.style.background = '#d4c4a0';
      card1.style.color = '#000';
      card2.style.color = '#000';
      flipped = [];
    }, 1000);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMemoryPuzzle);