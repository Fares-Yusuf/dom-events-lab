/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

/*-------------------------------- Variables --------------------------------*/
let firstNumber = '';
let operator = '';
let displayValue = '';
let oldValue = '';
let lastOperator = '';
let lastOperand = '';

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = event.target.innerText;

        // Handle clear operation
        if (buttonValue === 'C') {
            [displayValue, firstNumber, operator, lastOperand, lastOperator] = ['0', '', '', '', ''];
            display.innerText = displayValue;
            return;
        }

        // Handle number inputs
        if (button.classList.contains('number')) {
            if (displayValue === '0' || lastOperator === '=') {
                displayValue = buttonValue;
            } else {
                displayValue += buttonValue;
            }
            lastOperator = '';
            display.innerText = displayValue;
            return;
        }

        // Handle operators
        if (button.classList.contains('operator') && buttonValue !== '=' && buttonValue != '0') {
            [firstNumber, operator, displayValue, lastOperator, lastOperand] = [displayValue, buttonValue, '0', '', ''];
            display.innerText = displayValue;
            return;
        }

        // Handle equals
        if (buttonValue === '=') {
            if (operator && firstNumber) {
                // If lastOperator is '=', use the last operand and operator for repeated calculation
                if (lastOperator === '=') {
                    displayValue = calculate(displayValue, lastOperand, operator);
                } else {
                    lastOperand = displayValue;
                    displayValue = calculate(firstNumber, displayValue, operator);
                }
                display.innerText = displayValue;
                firstNumber = displayValue;
                lastOperator = '=';
            }
        }
    });
});

/*-------------------------------- Functions --------------------------------*/
// could also just use eval but what's the fun in that?
function calculate(num1, num2, operator) {
    console.log(num1, operator, num2);
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+': return (num1 + num2).toString();
        case '-': return (num1 - num2).toString();
        case '*': return (num1 * num2).toString();
        case '/': return (num1 / num2).toString();
    }
}