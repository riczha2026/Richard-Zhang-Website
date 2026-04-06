// ============================
// PUZZLE 1: PHOTO JIGSAW
// ============================
let pieceSize = 120;
const GRID = 3;
let pieces = [];
let dragSrcIdx = null;
let fullCanvasCache = null;

function initPuzzle() {
  const container = document.getElementById('puzzle-container');
  container.style.gridTemplateColumns = `repeat(${GRID}, ${pieceSize}px)`;
  container.innerHTML = '';

  // Create the full image on an offscreen canvas
  const fullCanvas = document.createElement('canvas');
  fullCanvas.width = pieceSize * GRID;
  fullCanvas.height = pieceSize * GRID;
  const ctx = fullCanvas.getContext('2d');

  // Load user's actual photo or draw portrait
  loadPortraitImage(ctx, pieceSize * GRID, () => {
    fullCanvasCache = fullCanvas;
    createPuzzlePieces(fullCanvas, container);
  });
}

function loadPortraitImage(ctx, size, callback) {
  // Try to load user's photo from images folder
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
    callback();
  };
  img.onerror = () => {
    // Fallback to generated portrait
    drawPortrait(ctx, size);
    callback();
  };
  img.src = 'images/photo.jpg';
}

function shuffleArray(arr) {
  // Fisher-Yates shuffle algorithm for better randomization
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function createPuzzlePieces(fullCanvas, container) {
  // Create scrambled order - ensure it's actually scrambled
  const order = [...Array(GRID * GRID).keys()];
  shuffleArray(order);
  
  // Keep shuffling until we get a configuration that's different from the original
  while (order.every((v, i) => v === i)) {
    shuffleArray(order);
  }

  pieces = order.map((srcIdx, slotIdx) => ({
    srcIdx,
    slotIdx,
    correct: srcIdx === slotIdx
  }));

  pieces.forEach((piece, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'puzzle-piece';
    wrapper.style.width = pieceSize + 'px';
    wrapper.style.height = pieceSize + 'px';
    wrapper.dataset.slot = i;

    const canvas = document.createElement('canvas');
    canvas.width = pieceSize;
    canvas.height = pieceSize;
    const pctx = canvas.getContext('2d');

    // Draw the correct slice
    const col = piece.srcIdx % GRID;
    const row = Math.floor(piece.srcIdx / GRID);
    pctx.drawImage(fullCanvas,
      col * pieceSize, row * pieceSize, pieceSize, pieceSize,
      0, 0, pieceSize, pieceSize
    );

    wrapper.appendChild(canvas);
    wrapper.draggable = true;

    wrapper.addEventListener('dragstart', e => {
      dragSrcIdx = i;
      wrapper.classList.add('dragging');
    });
    wrapper.addEventListener('dragend', () => wrapper.classList.remove('dragging'));
    wrapper.addEventListener('dragover', e => e.preventDefault());
    wrapper.addEventListener('drop', e => {
      e.preventDefault();
      if (dragSrcIdx !== null && dragSrcIdx !== i) {
        swapPieces(dragSrcIdx, i);
      }
    });

    container.appendChild(wrapper);
  });

  updatePuzzleProgress();
}

function drawPortrait(ctx, size) {
  // Fallback portrait if no photo is provided
  ctx.fillStyle = '#2a1f10';
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = '#1a1208';
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 20) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
  }

  const grad = ctx.createRadialGradient(size/2, size/2, size*0.2, size/2, size/2, size*0.75);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.7)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = '#1a1208';
  ctx.beginPath();
  ctx.ellipse(size/2, size*0.85, size*0.32, size*0.28, 0, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#f0e8d0';
  ctx.beginPath();
  ctx.moveTo(size/2 - 30, size*0.68);
  ctx.lineTo(size/2, size*0.78);
  ctx.lineTo(size/2 + 30, size*0.68);
  ctx.fill();

  ctx.fillStyle = '#c0392b';
  ctx.beginPath();
  ctx.moveTo(size/2 - 8, size*0.68);
  ctx.lineTo(size/2, size*0.82);
  ctx.lineTo(size/2 + 8, size*0.68);
  ctx.fill();

  ctx.fillStyle = '#c8a06a';
  ctx.beginPath();
  ctx.ellipse(size/2, size*0.63, 16, 18, 0, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#c8a06a';
  ctx.beginPath();
  ctx.ellipse(size/2, size*0.42, size*0.2, size*0.22, 0, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#1a0f05';
  ctx.beginPath();
  ctx.ellipse(size/2, size*0.29, size*0.2, size*0.1, 0, Math.PI, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(size/2 - size*0.17, size*0.38, size*0.06, size*0.12, -0.3, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(size/2 + size*0.17, size*0.38, size*0.06, size*0.12, 0.3, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = '#1a1208';
  ctx.beginPath(); ctx.ellipse(size/2 - 22, size*0.41, 9, 6, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(size/2 + 22, size*0.41, 9, 6, 0, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle = 'white';
  ctx.beginPath(); ctx.arc(size/2 - 19, size*0.40, 3, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(size/2 + 25, size*0.40, 3, 0, Math.PI*2); ctx.fill();

  ctx.strokeStyle = '#a07040';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(size/2, size*0.43);
  ctx.lineTo(size/2 - 6, size*0.50);
  ctx.lineTo(size/2 + 6, size*0.50);
  ctx.stroke();

  ctx.strokeStyle = '#8a5030';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(size/2, size*0.54, 14, 0.2, Math.PI - 0.2);
  ctx.stroke();

  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, size-6, size-6);

  ctx.fillStyle = 'rgba(184,134,11,0.15)';
  ctx.font = `bold ${size*0.4}px 'Bebas Neue', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RZ', size/2, size/2);

  ctx.fillStyle = 'rgba(240,232,208,0.8)';
  ctx.font = `${size*0.045}px 'Courier Prime', monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('SUBJECT: R. ZHANG // CASE #RZ-2026', size/2, size - 10);
}

function swapPieces(idxA, idxB) {
  // Swap the source indices
  [pieces[idxA].srcIdx, pieces[idxB].srcIdx] = [pieces[idxB].srcIdx, pieces[idxA].srcIdx];

  // Update correct status
  pieces.forEach((piece, i) => {
    piece.correct = piece.srcIdx === i;
  });

  // Use cached canvas for better performance
  const container = document.getElementById('puzzle-container');
  const children = Array.from(container.children);
  updatePiecesDisplay(children, fullCanvasCache);
}

function updatePiecesDisplay(children, fullCanvas) {
  pieces.forEach((piece, i) => {
    const wrapper = children[i];
    const canvas = wrapper.querySelector('canvas');
    const pctx = canvas.getContext('2d');
    pctx.clearRect(0, 0, pieceSize, pieceSize);
    const col = piece.srcIdx % GRID;
    const row = Math.floor(piece.srcIdx / GRID);
    pctx.drawImage(fullCanvas, col*pieceSize, row*pieceSize, pieceSize, pieceSize, 0, 0, pieceSize, pieceSize);

    wrapper.className = 'puzzle-piece' + (piece.correct ? ' correct' : '');
  });
  updatePuzzleProgress();
}

function updatePuzzleProgress() {
  const correct = pieces.filter(p => p.correct).length;
  document.getElementById('puzzle-progress').textContent = `${correct} / ${GRID*GRID} pieces placed correctly`;
  if (correct === GRID * GRID) {
    setTimeout(() => {
      document.getElementById('puzzle-progress').textContent = '✅ IDENTITY VERIFIED — ACCESS GRANTED';
      document.getElementById('puzzle-progress').style.color = '#4a8a4a';
      setTimeout(() => {
        showMain();
      }, 1200);
    }, 400);
  }
}

function showMain() {
  showScreen('main-screen');
  showNotification('🗂️ Case file opened. Solve each puzzle to reveal classified intel.', 'success');
}
