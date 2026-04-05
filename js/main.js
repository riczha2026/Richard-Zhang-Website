// ============================
// STATE & GLOBAL VARIABLES
// ============================
const unlocked = { education: false, experience: false, projects: false, skills: false };
let solvedCount = 0;

// ============================
// SCREEN MANAGEMENT
// ============================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startPuzzle() {
  showScreen('puzzle-screen');
  initPuzzle();
}

// ============================
// NAVIGATION WITH PUZZLE LOCKING
// ============================
let currentSection = 'profile';

function showSection(name) {
  // Profile is always accessible
  if (name === 'profile') {
    document.querySelectorAll('.case-section').forEach(s => s.classList.remove('visible'));
    document.querySelector('#section-profile').classList.add('visible');
    updateNavTabs('profile');
    currentSection = 'profile';
    return;
  }

  // All other sections require the previous section to be solved
  const sectionOrder = ['education', 'experience', 'projects', 'skills'];
  const currentIndex = sectionOrder.indexOf(name);
  
  // Check if all previous puzzles are solved
  let allPreviousSolved = true;
  for (let i = 0; i < currentIndex; i++) {
    if (!unlocked[sectionOrder[i]]) {
      allPreviousSolved = false;
      break;
    }
  }

  if (!allPreviousSolved) {
    showNotification(`🔒 Complete previous puzzles first!`, 'error');
    return;
  }

  // Show the section
  document.querySelectorAll('.case-section').forEach(s => s.classList.remove('visible'));
  const section = document.getElementById('section-' + name);
  if (section) section.classList.add('visible');
  updateNavTabs(name);
  currentSection = name;
}

function updateNavTabs(name) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const buttons = document.querySelectorAll('.nav-tab');
  const names = ['profile', 'education', 'experience', 'projects', 'skills'];
  const idx = names.indexOf(name);
  if (idx >= 0 && buttons[idx]) buttons[idx].classList.add('active');
}

function tryTab(name) {
  showSection(name);
}

// ============================
// UNLOCK SECTION
// ============================
function unlockSection(name) {
  if (unlocked[name]) return;
  unlocked[name] = true;
  solvedCount++;

  const gate = document.getElementById('gate-' + name);
  const content = document.getElementById('content-' + name);
  const badge = document.getElementById('badge-' + name);
  const tab = document.getElementById('tab-' + name);

  if (gate) gate.style.display = 'none';
  if (content) { 
    content.style.display = 'block'; 
    content.classList.add('success-flash'); 
  }
  if (badge) { 
    badge.textContent = 'DECLASSIFIED'; 
    badge.style.color = '#4a8a4a'; 
    badge.style.borderColor = '#4a8a4a'; 
  }
  if (tab) { 
    tab.classList.remove('locked'); 
    tab.textContent = name.charAt(0).toUpperCase() + name.slice(1); 
  }

  // Update progress
  const pct = (solvedCount / 4) * 100;
  document.getElementById('solve-progress').style.width = pct + '%';

  showNotification(`🔓 "${name.toUpperCase()}" file declassified! ${4 - solvedCount} remaining.`, 'success');

  if (solvedCount === 4) {
    setTimeout(() => showNotification('🏆 ALL FILES DECLASSIFIED — Case solved, detective!', 'success'), 2000);
  }
}

// ============================
// NOTIFICATION SYSTEM
// ============================
let notifTimeout;
function showNotification(msg, type = '') {
  const el = document.getElementById('notification');
  el.textContent = msg;
  el.className = 'notification show' + (type ? ' ' + type : '');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => el.classList.remove('show'), 3500);
}

// ============================
// INIT
// ============================
window.addEventListener('DOMContentLoaded', () => {
  // Pre-init all puzzles
  initWordle();
  initBugGame();
  initMemory();

  // Show profile section initially
  document.getElementById('section-profile').classList.add('visible');
});