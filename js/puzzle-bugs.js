// ============================
// PUZZLE 4: DEBUG CODE (PROJECTS)
// ============================
const buggyCode = `def analyze_user_data(users):
    total_age = 0
    for user in users:
        total_age += user['age']
    average_age = total_age / len(users)  # BUG 1: No error handling for empty list
    
    active_users = []
    for user in users:
        if user['status'] == 'active'  # BUG 2: Missing colon
            active_users.append(user)
    
    highest_salary = max(u['salary'] for u in active_users)
    return {
        'average_age': average_age,
        'active_count': len(active_users),
        'top_salary': highest_salary
    }`;

const bugs = [
  { line: 5, error: "Missing zero-division check for empty users list" },
  { line: 9, error: "Missing colon ':' after if statement" },
  { line: 12, error: "max() will fail if active_users is empty - needs error handling" }
];

let bugsFound = [];

function initDebugPuzzle() {
  const codeEl = document.getElementById('bug-code');
  if (!codeEl) return;
  
  codeEl.innerHTML = `<pre style="color: #d4c4a0; margin: 0; font-family: 'Courier Prime', monospace; font-size: 12px; line-height: 1.6;">${buggyCode.split('\n').map((line, i) => `<span class="code-line" data-line="${i + 1}" style="cursor: pointer; display: block; padding: 2px 8px; hover-background: #2a2015;" onclick="clickLine(${i + 1})">${(i + 1).toString().padStart(2, '0')}: ${line}</span>`).join('')}</pre>`;
}

function clickLine(lineNum) {
  const bug = bugs.find(b => b.line === lineNum);
  const feedback = document.getElementById('bug-feedback');
  
  if (!bug) {
    feedback.textContent = '❌ No bug on this line. Try another!';
    feedback.style.color = '#e74c3c';
    return;
  }
  
  if (bugsFound.includes(lineNum)) {
    feedback.textContent = '⚠️ You already found this bug!';
    feedback.style.color = '#f39c12';
    return;
  }
  
  bugsFound.push(lineNum);
  feedback.innerHTML = `✅ Bug found on line ${lineNum}: ${bug.error}`;
  feedback.style.color = '#27ae60';
  
  // Highlight the line
  const line = document.querySelector(`[data-line="${lineNum}"]`);
  if (line) {
    line.style.background = 'rgba(39, 174, 96, 0.2)';
    line.style.borderLeft = '3px solid #27ae60';
    line.style.paddingLeft = '5px';
  }
  
  // Check if all bugs found
  if (bugsFound.length === 3) {
    setTimeout(() => {
      feedback.innerHTML = '🎉 All bugs debugged! Code is now functional!';
      feedback.style.color = '#27ae60';
      feedback.style.fontWeight = 'bold';
      
      showSuccessPopup(
        '🐛 DEBUGGING COMPLETE',
        'You have identified all critical bugs in the code. The suspect\'s project portfolio has been analyzed and classified.',
        'PROJECTS',
        '#e74c3c'
      );
      
      setTimeout(() => unlockSection('projects'), 1000);
    }, 600);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDebugPuzzle);