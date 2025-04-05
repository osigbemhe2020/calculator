
let equal_pressed = 0;
let operator_pressed = 0;
let operators = ["+", "-", "*", "/"];

//Refer all buttons excluding AC, DEL, and =
let button_input = document.querySelectorAll(".input-button");

//Refer input, equal, clear, and erase
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");

button_input.forEach((button) => {
    button.addEventListener("click", () => {
        if (equal_pressed == 1) {
            input.value = "";
            equal_pressed = 0;
        }
        if (operators.includes(button.value)) {
            operator_pressed = 1;
        }
        // Display value of each button
        input.value += button.value;
    });
});

function appendToResult(value) {
    input.value += value;
}

function clearResult() {
    input.value = '';
}

// **Scientific Function Handling**
function sine(x) {
    return Math.sin(x * (Math.PI / 180)); // Convert degrees to radians
}

function cosine(x) {
    return Math.cos(x * (Math.PI / 180));
}

function tangent(x) {
    return Math.tan(x * (Math.PI / 180));
}

// **Evaluate User Input**
equal.addEventListener("click", () => {
    equal_pressed = 1;
    let inp_val = input.value;

    // **Replace Scientific Functions in Input**
    inp_val = inp_val.replace(/sin\((\d+)\)/g, (match, num) => sine(Number(num)));
    inp_val = inp_val.replace(/cos\((\d+)\)/g, (match, num) => cosine(Number(num)));
    inp_val = inp_val.replace(/tan\((\d+)\)/g, (match, num) => tangent(Number(num)));

    try {
        // Evaluate the processed input
        let solution = eval(inp_val);

        // Display result (rounded if decimal)
        input.value = Number.isInteger(solution) ? solution : solution.toFixed(2);
    } catch (err) {
        alert("Invalid Input");
    }
});

// **Clear and Erase Functions**
clear.addEventListener("click", () => {
    input.value = "";
});

erase.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
});
