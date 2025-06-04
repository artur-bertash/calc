let displayValue = ""
let operation = ""
let a = ""
let b = ""
let lastOperator = ""
let lastOperand = ""
const result = document.querySelector(".result")

function operate(a, b, operation) {
    if (a == "" || b == "") return "Error";

    switch (operation) {
        case "÷":
            return +b === 0 ? "Error" : +a / +b;
        case "×":
            return +a * +b;
        case "+":
            return +a + +b;
        case "-":
            return +a - +b;
        default:
            return "Error";
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

    } else if (["÷", "×", "-", "+"].includes(value)) {
        button.addEventListener("click", button => {
            if (a !== "" && operation !== "" && displayValue !== "0") {
                b = displayValue;

                a = operate(a, b, operation);
                b = "";
            }


            if (a == "") {
                a = displayValue
            }
            operation = value
            displayValue = "0"
            result.textContent = displayValue
        })


    } else {
        button.addEventListener("click", button => {
            if (operation && a !== "" && displayValue !== "") {
                b = displayValue;

                displayValue = operate(a, b, operation)
                result.textContent = displayValue
                lastOperator = operation
                lastOperand = b

                a = displayValue
                b = ""
                operation = ""
            }

            else if (lastOperator && lastOperand) {

                displayValue = operate(a, lastOperand, lastOperator)
                result.textContent = displayValue
                a = displayValue
            }
        })

    }

})