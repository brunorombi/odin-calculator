const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
const equalBtn = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');

let operator = null;
let waitingForSecondOperand = false;
let displayValue = "0";
let firstOperand = null;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b){
    return a * b;
}

const divide = function(a, b){
    if (a === 0) return 'Error';
    return a / b;
}

function operate(operand1, operand2, operator) {
    switch(operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "X":
            return multiply(operand1, operand2);
        case "÷":
            return divide(operand1, operand2);
    }
}

function inputDigit(digit) {
    if (waitingForSecondOperand === true) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(firstOperand, inputValue, operator);
        displayValue = `${result}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;

    updateDisplay();
}


btns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        const value = event.target.textContent.trim();

        if (!isNaN(value) && value !== '.') {
            inputDigit(value);
            updateDisplay()
        }

        else if (['+', '-', 'X', '÷'].includes(value)) {
            handleOperator(value);
        }
    });
});


equalBtn.addEventListener('click', () => {
    if (firstOperand !== null && operator !== null) {
        const secondOperand = parseFloat(displayValue);
        const result = operate(firstOperand, secondOperand, operator);
        displayValue = `${result}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }
});


function updateDisplay() {
    display.textContent = displayValue;
}

clearBtn.addEventListener('click', () => {
    displayValue = "0";
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
})

updateDisplay();

