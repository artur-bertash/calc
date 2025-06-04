let displayValue = ""
let operation = ""
let a = ""
let b = ""
let lastOperation = ""
let lastOperand = ""
const result = document.querySelector(".result")
function operate(a, b, operation) {
    if (a == "" || b == "") {
        displayValue = "Error"
    }
    console.log(a, b, operation)

    switch (operation) {
        case "÷":
            if (+b === 0) {
                displayValue = "Error"
            } else {
                displayValue = +a / +b
            }
            break
        case "×":
            displayValue = +a * +b
            break
        case "+":
            displayValue = +a + +b
            break
        case "-":
            displayValue = +a - +b
            break
    }
}

document.querySelectorAll('button').forEach((button) => {
    const value = button.textContent
    if (!isNaN(value) || value === ".") {
        button.addEventListener("click", () => {
            if (value === "." && displayValue.includes(".")) return;
            if (displayValue == "0") {
                displayValue = value
            } else {
                displayValue += value

            }
            result.textContent = displayValue

        })

    } else if (value == "AC") {
        button.addEventListener("click", button => {
            displayValue = "0"
            a = ""
            b = ""
            operation = ""
            result.textContent = displayValue
        })

    } else if (value == "÷" || value == "×" || value == "-" || value == "+") {
        button.addEventListener("click", button => {
            if (a !== "" && operation !== "" && displayValue !== "0") {
                b = displayValue;
                operate(a, b, operation);
                a = displayValue;
                b = "";
            }

            console.log("pressed syumbo")
            if (a == "") {
                a = displayValue
            } else if (b == "") {
                b = displayValue
            }
            operation = value
            displayValue = "0"
            result.textContent = displayValue
        })


    } else {
        button.addEventListener("click", button => {
            if (operation && a !== "" && displayValue !== "") {
                b = displayValue;
                operate(a, b, operation);
                result.textContent = displayValue;

                lastOperator = operation;
                lastOperand = b;

                a = displayValue;
                b = "";
                operation = "";
            }
            // 
            else if (lastOperator && lastOperand) {
                operate(a, lastOperand, lastOperator);
                result.textContent = displayValue;
                a = displayValue;
            }
        })

    }

})