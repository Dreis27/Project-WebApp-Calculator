const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('deleteBtn');
const numButtons = document.querySelectorAll('.num');

const decimalBtn = document.getElementById('decimal');
const divideBtn = document.getElementById('division');
const multBtn = document.getElementById('multiplication');
const addBtn = document.getElementById('addition');
const subBtn = document.getElementById('subtraction');
const equalsBtn = document.getElementById('equals');
const screen = document.getElementById('display');

let operand1 = "";
let operand2 = "";
let currentOperation = null;
let shouldReset = false;

clearBtn.addEventListener('click', clear);
delBtn.addEventListener('click', deleteNum);
decimalBtn.addEventListener('click', addDecimal);
equalsBtn.addEventListener('click', evaluate);

multBtn.addEventListener('click', () => setOperation(multBtn.textContent));
divideBtn.addEventListener('click', () => setOperation(divideBtn.textContent));
addBtn.addEventListener('click', () => setOperation(addBtn.textContent));
subBtn.addEventListener('click', () => setOperation(subBtn.textContent));

numButtons.forEach((button) =>
    button.addEventListener('click', () => printNumber(button.textContent))
)

function printNumber(number) {
    if (screen.textContent === '0' || shouldReset)
        reset();
    screen.textContent += number;
}

function reset(){
    screen.textContent = '';
    shouldReset = false;
}

function clear(){
    screen.textContent = '0';
    operand1 = "";
    operand2 = "";
    currentOperation = null;
}

function addDecimal(){
    if (shouldReset) reset();
    if (screen.textContent === '')
        screen.textContent = '0';
    if (screen.textContent.includes(".")) return
        screen.textContent += '.';
}

function deleteNum(){
    if (screen.textContent === '')
    {return;}
    screen.textContent = screen.textContent.slice(0, -1);
}

function evaluate(){
    if(currentOperation === null || shouldReset) return;
    if (currentOperation === '/' && screen.textContent === '0'){
        alert("Can't divide by 0 mf");
        return;
    }
    operand2 = screen.textContent;

    screen.textContent = operate(currentOperation, operand1 , operand2);

    currentOperation = null;
}

function setOperation(operator){
    if(currentOperation !== null) evaluate();
    operand1 = screen.textContent;
    currentOperation = operator;
    shouldReset = true;
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function divide(a,b){
    return a/b;
}

function multiply(a,b){
    return a*b;
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    if(operator === '+'){
        return add(a,b);
    }
    else if(operator === '-'){
        return subtract(a,b);
    }
    else if(operator === '*'){
        return multiply(a,b);
    }
    else if(operator === '/'){
        if(b===0) return null;
        else return divide(a,b);
    }
    else{
        return null;
    }
}
