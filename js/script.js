let displayValue = "0";
let firstOperand = null;
let operator = null;
let isValidExp = false;

function updateDisplay() {
  const display = document.querySelector(".calc__display-txt");
  display.textContent = displayValue;
}
updateDisplay();

function appendNum(num) {
  displayValue = displayValue === "0" ? num : (displayValue += num);
}

function appendDecimal(dot) {
  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

const calcButtons = document.querySelector(".calc__buttons");
calcButtons.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("key-opt")) {
    console.log(target);
    return;
  }

  if (target.classList.contains("key-dot")) {
    appendDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("key-clear")) {
    console.log(target);
    return;
  }

  if (target.classList.contains("key-delete")) {
    console.log(target);
    return;
  }

  appendNum(target.value);
  updateDisplay();
});
