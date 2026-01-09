const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
const equalBtn = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');
// const operators = document.querySelector('.operator');


let operator = null;
let displayValue = "0";
let firstOperand = "";
let secondOperand = "";
let isSecondOperator = false;

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

btns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        const value = event.target.textContent.trim();
    
        handleInput(value, btn);

        displayValue += value;
        updateDisplay();
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
    }
});


function updateDisplay() {
    display.textContent = displayValue;
}

clearBtn.addEventListener('click', () => {
    displayValue = "0";
    firstOperand = "";
    secondOperand = "";
    operator = null;
    isSecondOperator = false;
    updateDisplay();
})


function handleInput(value, btn) {
    if (btn.classList.contains('operator')) {
        if (!isSecondOperator) {
            isSecondOperator = true;
        } else {
            calculate();
            updateDisplay();
            resetAfterResult(displayValue);
        }
        operator = value;
    }
    else if(operator) {
        secondOperand += value;
        
    } else {
        firstOperand += value;
    }
}

function resetAfterResult(result) {
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
updateDisplay();
