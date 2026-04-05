// ============================
// PUZZLE 4: BUG FINDER (PROJECTS)
// ============================
const bugs = [
  { line: 3, bug: 'Missing semicolon', fix: ';' },
  { line: 7, bug: 'Wrong operator', fix: '===' },
  { line: 12, bug: 'Undefined variable', fix: 'result' }
];

let bugsfound = 0;

function initBugGame() {
  const container = document.getElementById('bug-code');
  if (!container) return;
  
  const codeLines = [
    'function validateEmail(email) {',
    '  const pattern = /^[^@]+@[^@]+\\.[^@]+$/,',  // line 2 - missing semicolon
    '  if (email == pattern.test(email))',  // line 3 - wrong operator
    '    return true;',
    '  return false;',
    '}',
    '',
    'const userEmail = "user@example.com";',
    'if (validateEmail(userEmail)) {',
    '  console.log(resultt);',  // line 9 - undefined variable
    '}'
  ];

  codeLines.forEach((line, idx) => {
    const lineEl = document.createElement('div');
    lineEl.style.fontFamily = '"Courier Prime", monospace';
    lineEl.style.padding = '4px 8px';
    lineEl.style.margin = '2px 0';
    lineEl.style.cursor = 'pointer';
    lineEl.style.backgroundColor = '#faf6ec';
    lineEl.style.border = '1px solid #d4c4a0';
    lineEl.style.transition = 'all 0.15s';
    lineEl.style.fontSize = '13px';
    lineEl.dataset.line = idx;

    const lineNum = document.createElement('span');
    lineNum.style.color = '#b8860b';
    lineNum.style.marginRight = '12px';
    lineNum.style.fontWeight = 'bold';
    lineNum.textContent = (idx + 1).toString().padStart(2, '0');

    const code = document.createElement('span');
    code.textContent = line;

    lineEl.appendChild(lineNum);
    lineEl.appendChild(code);

    lineEl.addEventListener('click', () => checkBugClick(idx, lineEl));
    lineEl.addEventListener('mouseenter', () => {
      lineEl.style.backgroundColor = '#f0e8d0';
      lineEl.style.borderColor = '#b8860b';
    });
    lineEl.addEventListener('mouseleave', () => {
      if (!lineEl.classList.contains('bug-found')) {
        lineEl.style.backgroundColor = '#faf6ec';
        lineEl.style.borderColor = '#d4c4a0';
      }
    });

    container.appendChild(lineEl);
  });
}

function checkBugClick(lineIdx, el) {
  const hasBug = bugs.some(b => b.line === lineIdx);
  const feedback = document.getElementById('bug-feedback');

  if (hasBug && !el.classList.contains('bug-found')) {
    el.classList.add('bug-found');
    el.style.backgroundColor = '#e8f4e8';
    el.style.borderColor = '#4a8a4a';
    bugsfound++;

    feedback.textContent = `✅ Bug found! (${bugsfound}/3)`;
    feedback.style.color = '#4a8a4a';

    if (bugsfound === 3) {
      feedback.textContent = '🎉 All bugs squashed! Debugging complete.';
      setTimeout(() => unlockSection('projects'), 600);
    }
  } else if (!hasBug && !el.classList.contains('bug-found')) {
    el.style.backgroundColor = '#faeaea';
    el.style.borderColor = 'var(--red)';
    feedback.textContent = '❌ No bug here. Keep looking!';
    feedback.style.color = 'var(--red)';
    setTimeout(() => {
      el.style.backgroundColor = '#faf6ec';
      el.style.borderColor = '#d4c4a0';
    }, 600);
  }
}