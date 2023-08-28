let displayValue = "0";
let firstOperand = null;
let operator = null;
let isWaiting = false;

function updateDisplay() {
  const display = document.querySelector(".calc__display-txt");
  display.textContent = displayValue;
}
updateDisplay();

function appendNum(num) {
  if (isWaiting) {
    displayValue = num;
    isWaiting = false;
  } else {
    displayValue = displayValue === "0" ? num : (displayValue += num);
  }

  console.log(`
  Display value = ${displayValue}
  1st Operand = ${firstOperand}
  Operator = ${operator}
  `);
}

function appendDecimal(dot) {
  if (isWaiting) {
    displayValue = "0.";
    isWaiting = false;

    console.log(`
    Display value = ${displayValue}
    1st Operand = ${firstOperand}
    Operator = ${operator}
    `);
    return;
  }
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }

  console.log(`
  Display value = ${displayValue}
  1st Operand = ${firstOperand}
  Operator = ${operator}
  `);
}

function handleOpt(opt) {
  const inputValue = parseFloat(displayValue);

  if (operator && isWaiting) {
    operator = opt;
    console.log(`
    Display value = ${displayValue}
    1st Operand = ${firstOperand}
    Operator = ${operator}
    `);
    return;
  }
  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);
    displayValue = `${parseFloat(result.toFixed(2))}`
    firstOperand = result;
  }
  isWaiting = true;
  operator = opt;

  console.log(`
  Display value = ${displayValue}
  1st Operand = ${firstOperand}
  Operator = ${operator}
  `);
}

function operate(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }

  return num2;
}

function resetCalc() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  isWaiting = false;
}

const calcButtons = document.querySelector(".calc__buttons");
calcButtons.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("key-opt")) {
    handleOpt(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-dot")) {
    appendDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-clear")) {
    resetCalc();
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-delete")) {
    console.log(target);
    return;
  }

  appendNum(target.value);
  updateDisplay();
});
