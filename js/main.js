// Object to track values
const Calculator = {
    // Display value
    displayValue: '0',
    //These will hold the operands and operator
    firstOperand: null,
    waitSecondOperand: false,
    operator: null
};

function Input_Digit(digit) {
    const { displayValue, waitSecondOperand } = Calculator;

    // Check if both operands are chosen and places them on screen
    if(waitSecondOperand === true)  {
        Calculator.displayValue = digit;
        Calculator.waitSecondOperand = false;
    }
    else {
        // Will put digit down or add to the display value
        Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function Input_Decimal(dot) {
    // Make sure its not put in multiple times
    if(Calculator.waitSecondOperand === true) return;
    if(!Calculator.displayValue.includes(dot)){
        Calculator.displayValue += dot;
    }
}

function Handle_Operator(nextOperator) {
    const { firstOperand, displayValue, operator } = Calculator;
    // When an operator is pressed, we change the current number
    // And then store the other operand if it exists
    const Value_of_Input = parseFloat(displayValue);
    // Checks if both operators exist
    // Updates operators and exits
    if(operator && Calculator.waitSecondOperand) {
        Calculator.operator = nextOperator;
        return
    }
    // If it is empty, this will fill the first operand
    if(firstOperand == null){
        Calculator.firstOperand = Value_of_Input
    }
    else if(operator){ //Checks for operator
        const valueNow = firstOperand || 0 // if it's null then it will set it to 0
        // Makes a result with the proper operator
        result = Perform_Calculation[operator](valueNow, Value_of_Input);
        // Fix the decimal point to 9 digits
        result = Number(result).toFixed(9);
        // Get rid of 0's
        result = (result * 1).toString();
        // Changes back first operand to the display value
        Calculator.displayValue = parseFloat(result);
        Calculator.firstOperand = parseFloat(result);
    }
    Calculator.waitSecondOperand = true;
    Calculator.operator = nextOperator;
}

const Perform_Calculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand, 
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand, 
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand, 
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand, 
    '=': (firstOperand, secondOperand) => secondOperand
}
// A clear function
function Calculator_Reset() {
    Calculator.displayValue = '0';
    Calculator.firstOperand = null;
    Calculator.waitSecondOperand = false;
    Calculator.operator = null
}

function Update_Display() {
    // update the screen with the content in display value
    const display = document.querySelector('.calculator-screen')
    display.value = Calculator.displayValue;
}

Update_Display();
// Monitoring button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    // Leave function if it doesn't match any button
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')){
        Handle_Operator(target.value);
        Update_Display();
        return
    }

    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
})
