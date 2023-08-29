let currentNumber = "0";
let currentOperator = null;
let firstOperand = null;
let isWritingMode = false;

const calcDisplay = document.querySelector(".calc__display-txt");
const calcButtons = document.querySelector(".calc__buttons");

const updateDisplay = () => {
  calcDisplay.textContent = currentNumber;
};

const operate = (num1, num2, operation) => {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        return "ERROR";
      }
      return num1 / num2;
  }
  return num2;
};

updateDisplay();
calcButtons.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("key-num")) {
    const number = target.value;

    if (!isWritingMode) {
      currentNumber = number;
      isWritingMode = true;
    } else {
      currentNumber =
        currentNumber === "0" ? number : (currentNumber += number);
    }
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-opt")) {
    const operator = target.value;
    const currentValue = parseFloat(currentNumber);
    if (currentOperator !== null && !isWritingMode) {
      currentOperator = operator;
      return;
    }

    if (firstOperand === null) {
      firstOperand = currentValue;
    } else if (currentOperator) {
      const result = operate(firstOperand, currentValue, currentOperator);
      currentNumber =
        typeof result === "number"
          ? `${parseFloat(result.toFixed(2))}`
          : result;
      firstOperand = result;
    }
    currentOperator = operator;
    isWritingMode = false;
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-dot")) {
    if (!isWritingMode) {
      currentNumber = "0.";
      isWritingMode = true;
      updateDisplay();
      return;
    }
    if (!currentNumber.includes(".")) {
      currentNumber += ".";
    }
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-delete")) {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1) || "0";
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-clear")) {
    currentNumber = "0";
    currentOperator = null;
    firstOperand = null;
    isWritingMode = false;
    updateDisplay();
    return;
  }
});
