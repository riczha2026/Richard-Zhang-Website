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
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
}

function startPuzzle() {
  showScreen('puzzle-screen');
  setTimeout(() => initPhotoP uzzle(), 100);
}

// ============================
// NAVIGATION WITH PUZZLE LOCKING
// ============================
let currentSection = 'profile';

function showSection(name) {
  // Profile is always accessible
  if (name === 'profile') {
    document.querySelectorAll('.case-section').forEach(s => s.style.display = 'none');
    const profileSection = document.getElementById('section-profile');
    if (profileSection) profileSection.style.display = 'block';
    updateNavTabs('profile');
    currentSection = 'profile';
    return;
  }

  // All other sections require unlocking
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

  // If section is not unlocked, show notification
  if (!unlocked[name]) {
    showNotification(`🔒 ${name.toUpperCase()} section is locked. Solve the puzzle!`, 'error');
    return;
  }

  // Show the section
  document.querySelectorAll('.case-section').forEach(s => s.style.display = 'none');
  const section = document.getElementById('section-' + name);
  if (section) section.style.display = 'block';
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
    if (content.classList) content.classList.add('success-flash'); 
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
  const progressBar = document.getElementById('solve-progress');
  if (progressBar) progressBar.style.width = pct + '%';

  showNotification(`🔓 "${name.toUpperCase()}" file declassified! ${4 - solvedCount} remaining.`, 'success');

  if (solvedCount === 4) {
    setTimeout(() => showNotification('🏆 ALL FILES DECLASSIFIED — Case solved, detective!', 'success'), 2000);
  }
}

// ============================
// POPUP SYSTEM (Used by all puzzles)
// ============================
function showSuccessPopup(title, message, nextSection, color) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '10000';
  overlay.style.animation = 'fadeIn 0.3s ease';
  
  // Create popup
  const popup = document.createElement('div');
  popup.style.background = '#f5f1e8';
  popup.style.border = '3px solid #1a1208';
  popup.style.borderRadius = '8px';
  popup.style.padding = '40px';
  popup.style.maxWidth = '520px';
  popup.style.textAlign = 'center';
  popup.style.fontFamily = '"Special Elite", cursive';
  popup.style.boxShadow = '0 10px 50px rgba(0, 0, 0, 0.5)';
  popup.style.animation = 'slideUp 0.4s ease';
  
  // Title
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  titleEl.style.color = color || '#27ae60';
  titleEl.style.marginBottom = '20px';
  titleEl.style.fontSize = '32px';
  titleEl.style.fontWeight = 'bold';
  titleEl.style.margin = '0 0 20px 0';
  
  // Message
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  messageEl.style.color = '#1a1208';
  messageEl.style.marginBottom = '30px';
  messageEl.style.fontSize = '16px';
  messageEl.style.lineHeight = '1.8';
  messageEl.style.margin = '0 0 30px 0';
  
  // Next section hint
  const sectionEl = document.createElement('p');
  sectionEl.textContent = `🔓 Next: ${nextSection.toUpperCase()} SECTION`;
  sectionEl.style.color = '#6a5a3a';
  sectionEl.style.marginBottom = '30px';
  sectionEl.style.fontSize = '14px';
  sectionEl.style.fontStyle = 'italic';
  sectionEl.style.margin = '0 0 30px 0';
  
  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'CONTINUE';
  closeBtn.style.padding = '14px 40px';
  closeBtn.style.background = color || '#27ae60';
  closeBtn.style.color = '#fff';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '4px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.fontFamily = '"Bebas Neue", sans-serif';
  closeBtn.style.fontSize = '18px';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.transition = 'all 0.3s';
  closeBtn.style.letterSpacing = '1px';
  
  closeBtn.onmouseover = () => {
    closeBtn.style.opacity = '0.8';
    closeBtn.style.transform = 'scale(1.05)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.opacity = '1';
    closeBtn.style.transform = 'scale(1)';
  };
  
  closeBtn.onclick = () => {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => overlay.remove(), 300);
  };
  
  popup.appendChild(titleEl);
  popup.appendChild(messageEl);
  popup.appendChild(sectionEl);
  popup.appendChild(closeBtn);
  overlay.appendChild(popup);
  
  document.body.appendChild(overlay);
}

// ============================
// NOTIFICATION SYSTEM
// ============================
let notifTimeout;
function showNotification(msg, type = '') {
  const el = document.getElementById('notification');
  if (!el) return;
  
  el.textContent = msg;
  el.className = 'notification show' + (type ? ' ' + type : '');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => el.classList.remove('show'), 3500);
}

// ============================
// ADD ANIMATIONS
// ============================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes success-flash {
    0% { background: rgba(39, 174, 96, 0.1); }
    100% { background: transparent; }
  }
  
  .success-flash {
    animation: success-flash 0.6s ease !important;
  }
`;
document.head.appendChild(style);

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // Show main screen
  showScreen('main-screen');
  
  // Show profile section initially
  showSection('profile');
  
  // Initialize puzzle functions (they'll auto-init when needed)
  // Removed pre-init of puzzles - they init when their gates are reached
});