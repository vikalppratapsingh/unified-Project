const display = document.getElementById('display');
let expression = '';
let resetNext = false;

// Update display function
function updateDisplay(val) {
  display.textContent = val;
}

// Main input handler
function handleButton(action) {
  if (!isNaN(action) || action === '.' || action === '(' || action === ')') {
    // Digits, decimal or parentheses
    if (resetNext) {
      expression = '';
      resetNext = false;
    }
    // Prevent multiple decimals in a single number
    if (action === '.' && /\.\d*$/.test(expression.replace(/[^\d.]/g, ''))) return;
    expression += action;
    updateDisplay(expression);
  } else if ('+-*/'.includes(action)) {
    if (expression === '' && action !== '-') return; // Only allow minus at start
    if (/[+\-*/(]$/.test(expression)) return; // Prevent consecutive operators
    expression += action;
    updateDisplay(expression);
  } else if (action === 'clear') {
    expression = '';
    updateDisplay('0');
  } else if (action === 'equals') {
    try {
      // Replace symbols if needed
      let exp = expression.replace(/÷/g, '/').replace(/×/g, '*');
      // Evaluate expression (handles BODMAS/BIDMAS and parentheses)
      let result = Function('"use strict";return (' + exp + ')')();
      if (!isFinite(result)) throw new Error("Math Error");
      updateDisplay(result);
      expression = result.toString();
      resetNext = true;
    } catch (e) {
      updateDisplay("Error");
      expression = '';
      resetNext = true;
    }
  }
}

// Listen to button clicks
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    let action = btn.getAttribute('data-action');
    handleButton(action);
  });
});

// Keyboard input support
document.addEventListener('keydown', e => {
  // Accept numbers, operators, dot, and parentheses
  if ((e.key >= '0' && e.key <= '9') || ".+-*/()".includes(e.key)) {
    handleButton(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    handleButton('equals');
  } else if (e.key.toLowerCase() === 'c' || e.key === 'Escape') {
    handleButton('clear');
  }
});