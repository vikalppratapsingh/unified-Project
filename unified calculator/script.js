const display = document.getElementById('display');
let expression = '';
let resetNext = false;

function updateDisplay(val) {
  display.textContent = val;
}

function handleButton(action) {
  if (!isNaN(action) || action === '.' || action === '(' || action === ')') {
    if (resetNext) {
      expression = '';
      resetNext = false;
    }
    if (action === '.' && /\.\d*$/.test(expression.replace(/[^\d.]/g, ''))) return;
    expression += action;
    updateDisplay(expression);
  } else if ('+-*/'.includes(action)) {
    if (expression === '' && action !== '-') return;
    if (/[+\-*/(]$/.test(expression)) return;
    expression += action;
    updateDisplay(expression);
  } else if (action === 'clear') {
    expression = '';
    updateDisplay('0');
  } else if (action === 'equals') {
    try {
      let exp = expression.replace(/÷/g, '/').replace(/×/g, '*');
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

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    handleButton(action);
  });
});

document.addEventListener('keydown', e => {
  if ((e.key >= '0' && e.key <= '9') || ".+-*/()".includes(e.key)) {
    handleButton(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    handleButton('equals');
  } else if (e.key.toLowerCase() === 'c' || e.key === 'Escape') {
    handleButton('clear');
  }
});
