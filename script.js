const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
const equalBtn = document.querySelector('.equal-btn')

let operand1 = null;
let operand2 = null;
let operator = null;
let expression = "";

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
        expression += event.target.textContent
        display.textContent = expression;
    })
})

function storeNumbers() {
    const parts = expression.split(' ');
    operator = parts[1]
    operand1 = parseFloat(parts[0]);
    operand2 = parseFloat(parts[2]);
}

equalBtn.addEventListener('click', () => {
    storeNumbers();
    let result = operate(operand1, operand2, operator);
    expression = result;
    display.textContent = result;
});






