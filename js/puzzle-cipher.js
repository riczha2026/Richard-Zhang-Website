// ============================
// PUZZLE 2: CIPHER (EDUCATION)
// ============================
function checkCipher(val) {
  const clean = val.trim().toLowerCase().replace(/[^a-z\s]/g, '');
  const targets = ['university of california santa barbara', 'uc santa barbara', 'ucsb', 'university of california', 'santa barbara'];
  const match = targets.some(t => clean.includes(t.toLowerCase()));
  const feedback = document.getElementById('cipher-feedback');

  if (match) {
    feedback.textContent = '✅ Correct! Decoding complete...';
    feedback.style.color = '#27ae60';
    
    showSuccessPopup(
      '🔐 ENCRYPTION CRACKED',
      'You have successfully decoded the Caesar cipher and unlocked classified education records.',
      'EDUCATION',
      '#27ae60'
    );
    
    setTimeout(() => unlockSection('education'), 1000);
  } else if (val.length > 2) {
    feedback.textContent = '❌ Not quite. Remember: each letter shifted 3 forward. A→D, B→E...';
    feedback.style.color = '#e74c3c';
  }
}