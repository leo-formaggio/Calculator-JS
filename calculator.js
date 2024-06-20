const previousText = document.querySelector("#previous")
const currentText = document.querySelector("#current")
const buttons = document.querySelectorAll("#keyboard-container button")

class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.currentOperation = " "
    }

    // add digit to calculator screen
    addDigit(digit) {
        // check if current operation already has a dot
        if(digit === "." && this.currentText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = digit;
        this.updateScreen();
    }

    // process all calculator operations
    processOperation(operation) {
        // check if current is empty
        if(this.currentText.innerText === "" && operation !== "C") {
            // change operation
            if(this.previousText.innerText !== " ") {
                this.changeOperation(operation);
            }
            return;
        }
        
        // get current and previous value
        let operationValue
        const previous = +this.previousText.innerText.split(" ")[0];
        const current = +this.currentText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, previous, current);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, previous, current);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, previous, current);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, previous, current);
                break;
            case "BS":
                this.processDelOperation();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;      
            default:
                return;
        }
    }

    // change values of the calculatpr screen
    updateScreen(
        operationValue = null,
        operation = null, 
        previous = null,
        current = null
    ) {

        if(operationValue === null) {
            this.currentText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            // add current value to previous
            this.previousText.innerText =`${operationValue} ${operation}`
            this.currentText.innerText = "";
        }
        
    }

    // change math operation
    changeOperation(operation) {

        const mathOperations = ["+", "-", "*", "/"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousText.innerText = 
            this.previousText.innerText.slice(0, -1) + operation;
    }
    // delete the last digit
    processDelOperation() {
        this.currentText.innerText = 
            this.currentText.innerText.slice(0, -1);
    }

    // clear current operation
    processClearCurrentOperation() {
        this.currentText.innerText = " ";
    }

    // clear all operations
    processClearOperation() {
        this.previousText.innerText = " ";
        this.currentText.innerText = " ";
    }

    // process an operation
    processEqualOperator() {

        const operation = previousText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousText, currentText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});