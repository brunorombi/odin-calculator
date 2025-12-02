let operand1 = null;
let operand2 = null;
let operator = null;

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
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
    }
}

const display = document.querySelector('.display');
const btns = document.querySelectorAll('.btn');
let expression = "";

btns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        expression += event.target.textContent
        display.textContent = expression;
    })
})








