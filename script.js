const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
const equalBtn = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');
const operators = document.querySelectorAll('.operator')


let operator = null;
let displayValue = "0";
let firstOperand = "0";
let secondOperand = "";
let isSecondOperator = false;
let equalPressed = false;

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
    if (b === 0) return 'Cannot divide by zero';
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

btns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        const value = event.target.textContent.trim();
        handleInput(value, btn);
    });
});


equalBtn.addEventListener('click', () => {
    if (secondOperand) {
        calculate();
        updateDisplay();
        resetAfterResult(displayValue);
        secondOperand = "";
        operator = null;
        isSecondOperator = false;
        equalPressed = true;
    }
});


function updateDisplay() {
    display.textContent = displayValue;
}

clearBtn.addEventListener('click', () => {
    displayValue = "0";
    firstOperand = "0";
    secondOperand = "";
    operator = null;
    equalPressed = false;
    isSecondOperator = false;
    enableOperators();
    updateDisplay();
})

function handleInput(value, btn) {
    if (btn.classList.contains('operator')) {
        if (!isSecondOperator) {
            isSecondOperator = true;
            displayValue += value;
            operator = value;
        } else {
            calculate();
            updateDisplay();
            resetAfterResult(displayValue);

            if (displayValue === "Cannot divide by zero") {
            operator = null;
            isSecondOperator = false;
            }  else {
            displayValue += value;
            operator = value;
            }
        } 
    }
    else if(operator) {
        secondOperand += value;
        displayValue += value;
    } else {
        if (displayValue == "0" || displayValue === "Cannot divide by zero" || equalPressed ) {
            displayValue = "";
            firstOperand = "0";
            enableOperators();
            equalPressed = false;
        }
        firstOperand += value;
        displayValue += value;
    }

    updateDisplay();
}

function resetAfterResult(result) {
    if (result === "Cannot divide by zero") {
        disableOperators();
        return;
    }
    firstOperand = result;
    secondOperand = ""; 
}

function calculate() {
    let result = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
    const decimals = countDecimals(result);
    if (decimals > 8) {
        result = roundBigDecimalNumber(result);
    }
    displayValue = result;
}

function roundBigDecimalNumber(number) {
    return Math.round(number * 1e8) / 1e8;
}

function countDecimals(number) {
    const numStr = String(number);

    if (numStr.includes('.')) {
        return numStr.split('.')[1].length; 
    }

    return 0;
}

function disableOperators() {
    operators.forEach(operator => {
        operator.classList.add('blocked-operators');
    });

    firstOperand = "";
    secondOperand = "";
}

function enableOperators() {
    operators.forEach(operator => {
        operator.classList.remove('blocked-operators');
    });
}

updateDisplay();
