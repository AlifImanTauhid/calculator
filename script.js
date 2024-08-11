let currentValue = "";
let previousValue = "";
let operator = "";

const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const preview = document.querySelector(".screen-preview");
const current = document.querySelector(".screen-current");

numbers.forEach(number => number.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    current.textContent = currentValue;
}));

operators.forEach(op => op.addEventListener("click", (e) => {
    operatorHandler(e.target.textContent);
    preview.textContent = previousValue + " " + operator;
    current.textContent = currentValue;
}));

clear.addEventListener("click", () => {
    currentValue = '';
    previousValue = '';
    operator = '';
    preview.textContent = currentValue;
    current.textContent = currentValue;
});

equal.addEventListener("click", () => {
    if (currentValue != "" && previousValue != "") {
        calculate()
        preview.textContent = '';
        if (previousValue.length <= 9) {
            current.textContent = previousValue;
        } else {
            current.textContent = previousValue.slice(0, 9) + "...";
        }
    }
});

decimal.addEventListener("click", () => {
    addDecimal()
})

function handleNumber(num) {
    return (currentValue.length <= 9) ? currentValue += num : 'too long';
}

function operatorHandler(op) {
    operator += op;
    previousValue = currentValue;
    currentValue = "";
}

function calculate() {
    previousValue = Number(previousValue)
    currentValue = Number(currentValue)

    if (operator == "+") {
        previousValue += currentValue;
    } else if (operator == "-") {
        previousValue -= currentValue;
    } else if (operator == "x") {
        previousValue *= currentValue;
    } else {
        previousValue /= currentValue;
    }
    previousValue = roundNum(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
}

function roundNum(number) {
    return Math.round(number * 100 / 100);
}

function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += ".";
    }
}
