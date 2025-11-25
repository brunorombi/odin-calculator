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