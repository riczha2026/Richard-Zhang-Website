// ============================
// PUZZLE 5: MEMORY MATCH (SKILLS)
// ============================
const memoryPairs = [
  { id: 1, emoji: '⚛️', label: 'React' },
  { id: 2, emoji: '🟦', label: 'TypeScript' },
  { id: 3, emoji: '🐍', label: 'Python' },
  { id: 4, emoji: '🟨', label: 'JavaScript' },
  { id: 5, emoji: '🎨', label: 'CSS' },
  { id: 6, emoji: '🗄️', label: 'Databases' }
];

let memoryCards = [];
let flipped = [];
let matched = 0;

function initMemory() {
  const grid = document.getElementById('memory-grid');
  if (!grid) return;

  // Duplicate and shuffle
  const shuffled = [...memoryPairs, ...memoryPairs].sort(() => Math.random() - 0.5);
  
  grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
  grid.innerHTML = '';
  memoryCards = [];
  flipped = [];
  matched = 0;

  shuffled.forEach((pair, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${pair.emoji}</div>
      </div>
    `;
    card.dataset.id = pair.id;
    card.addEventListener('click', () => flipMemoryCard(idx, card, pair.id));
    grid.appendChild(card);
    memoryCards.push({ id: pair.id, flipped: false, matched: false });
  });
}

function flipMemoryCard(idx, cardEl, pairId) {
  if (flipped.length >= 2 || memoryCards[idx].matched || flipped.includes(idx)) return;

  cardEl.classList.add('flipped');
  flipped.push(idx);

  if (flipped.length === 2) {
    const id1 = memoryCards[flipped[0]].id;
    const id2 = memoryCards[flipped[1]].id;

    if (id1 === id2) {
      memoryCards[flipped[0]].matched = true;
      memoryCards[flipped[1]].matched = true;
      matched++;

      document.querySelectorAll('.memory-card').forEach((c, i) => {
        if (flipped.includes(i)) c.classList.add('matched');
      });

      if (matched === memoryPairs.length) {
        setTimeout(() => {
          document.getElementById('memory-feedback').textContent = '🎉 Perfect match! All pairs found!';
          document.getElementById('memory-feedback').style.color = '#4a8a4a';
          setTimeout(() => unlockSection('skills'), 600);
        }, 300);
      }
      flipped = [];
    } else {
      setTimeout(() => {
        document.querySelectorAll('.memory-card').forEach((c, i) => {
          if (flipped.includes(i)) c.classList.remove('flipped');
        });
        flipped = [];
      }, 1000);
    }
  }
}