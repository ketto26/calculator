let numbers = document.getElementsByClassName("num")

let first_number = document.getElementById("first_num");
let second_number = document.getElementById("second_num");
let operation = ""

const exponent = document.getElementById("expo");
const ac = document.getElementById("AC");
const back = document.getElementById("back");
const div = document.getElementById("div");
const mult = document.getElementById("mult");
const subtract = document.getElementById("minus");
const add = document.getElementById("plus");
const point = document.getElementById("point");
const square = document.getElementById("sqr");
const equal = document.getElementById("equals");

const symbols = ["^", "√", "÷", "×", "-", "+"]


// checks if operation(symbol) has been chosen
function hasSymbols() {
    if (first_number.textContent.length > 2){
        for (let i=0; i < symbols.length; i++) {
            let numb = first_number.textContent.slice(-2, -1).includes(symbols[i])
            if (numb) {
                return true
                }
            }
    }

    return false
}


// Tracks the number(0-9) user clicks and adds it as first/second number based on if operation(symbol) is chosen or not
function clicked_num(event) {
    if (first_number.textContent === "Error") {
        first_number.textContent = "0";
    }

    if (hasSymbols()){
        if (second_number.textContent === "0"){
            second_number.textContent = event.target.textContent;
        }
        else {
              second_number.textContent += event.target.textContent;
        }
    }
    else {
        if (first_number.textContent === "0"){
            first_number.textContent = event.target.textContent;
        } 
        else {
            first_number.textContent += event.target.textContent;
        }
    }

    if (first_number.textContent.length > 10 && !hasSymbols()) {
        first_number.textContent = first_number.textContent.slice(0, -1);
    } 
    else if (second_number.textContent.length > 10) {
        second_number.textContent = second_number.textContent.slice(0, -1);
    }
}


// Tells Calculate function what operation to do
function addsymbol(event) {
    if (hasSymbols() && first_number.textContent[0] != "-") {
        first_number.textContent = first_number.textContent.slice(0, -3)
    }
    else if (first_number.textContent.slice(-1) === " ") {
        first_number.textContent = first_number.textContent.slice(0, -3)
    }
    else if (first_number.textContent === "Error") {
        return;
    }

    if (event.target.textContent === "^") {
        first_number.textContent += " ^ ";
        operation = "^";
        second_number.textContent = "0";
    }
    else if (event.target.textContent === "√") {
        first_number.textContent = Math.sqrt(Number(first_number.textContent));;
        second_number.textContent = "0";
    }
    else if (event.target.textContent === "÷") {
        first_number.textContent += " ÷ ";
        operation = "÷";
        second_number.textContent = "0";
    }
    else if (event.target.textContent === "×") {
        first_number.textContent += " × ";
        operation = "×";
        second_number.textContent = "0";
    }
    else if (event.target.textContent === "-") {
        first_number.textContent += " - ";
        operation = "-";
        second_number.textContent = "0";
    }
    else if (event.target.textContent === "+") {
        first_number.textContent += " + ";
        operation = "+";
        second_number.textContent = "0";
    }
}


// Does the calculations based on what user inputted
function calculate() {
    if (operation === "^"){
        first_number.textContent = Number(first_number.textContent.slice(0, -3)) ** Number(second_number.textContent)
        second_number.textContent = "0";
        operation = "";
    }
    else if (operation === "÷") { 
        if (second_number.textContent === "0") {
            first_number.textContent = "Error"
            operation = ""
            return
        } else {
            first_number.textContent = Math.round(Number(first_number.textContent.slice(0, -3)) / Number(second_number.textContent) * 100) / 100;
            second_number.textContent = "0"
            operation = "";;
        }   
    }
    else if (operation === "×") { 
            first_number.textContent = Math.round(Number(first_number.textContent.slice(0, -3)) * Number(second_number.textContent) * 100) / 100;
            second_number.textContent = "0";
            operation = "";
        }
    else if (operation === "-") { 
        first_number.textContent = Number(first_number.textContent.slice(0, -3)) - Number(second_number.textContent)
        second_number.textContent = "0";
        operation = "";
    }
    else if (operation === "+") { 
        first_number.textContent = Number(first_number.textContent.slice(0, -3)) + Number(second_number.textContent)
        second_number.textContent = "0";
        operation = "";
    } 
    else if (first_number.textContent.slice(-1) === ".") {
        first_number.textContent = first_number.textContent.slice(0, -1)
        operation = "";
    }

    if (first_number.textContent > 9999999999 || first_number.textContent === "Infinity") {
        first_number.textContent = 9999999999;
    } 
    else if (first_number.textContent.length > 10) {
            first_number.textContent = parseFloat(first_number.textContent).toFixed(5)
        if (first_number.textContent.length > 10) {
            first_number.textContent = parseFloat(first_number.textContent).toFixed(3)
        }
        if (first_number.textContent.length > 10) {
            first_number.textContent = Math.round(first_number.textContent)
        }
    }
}


function deleteAll() {
    first_number.textContent = "0";
    second_number.textContent = "0";

}


function backspace() {
    if (first_number.textContent === "NaN") {
        first_number.textContent = "0";
    }
    else if (first_number.textContent === "Infinity") {
        first_number.textContent = "0";
    }

    if (second_number.textContent === "0") {
        if (hasSymbols()) {
            first_number.textContent = first_number.textContent.slice(0, -3);
        }
        else {
            if (first_number.textContent.length === 1) {
                first_number.textContent = 0;
            }
            else {
                first_number.textContent = first_number.textContent.slice(0, -1);
            }
        }
    }
    else {
        if (second_number.textContent.length === 1) {;
            second_number.textContent = "0";
        } 
        else {
            second_number.textContent = second_number.textContent.slice(0, -1);
        }
    }
}


function adddot() {
    if (second_number.textContent === "0") {
        if (!hasSymbols() && !first_number.textContent.includes(".")) {
            first_number.textContent += ".";
        } 
        else if (hasSymbols()) {
                second_number.textContent += ".";
        }
    }
    else {
        if (second_number.textContent.includes(".")) {
        }
        else {
            second_number.textContent += ".";
        }
    }
}


// Number events (0-9)
numbers[0].addEventListener("click", clicked_num);
numbers[1].addEventListener("click", clicked_num);
numbers[2].addEventListener("click", clicked_num);
numbers[3].addEventListener("click", clicked_num);
numbers[4].addEventListener("click", clicked_num);
numbers[5].addEventListener("click", clicked_num);
numbers[6].addEventListener("click", clicked_num);
numbers[7].addEventListener("click", clicked_num);
numbers[8].addEventListener("click", clicked_num);
numbers[9].addEventListener("click", clicked_num);

// Operations
exponent.addEventListener("click", addsymbol)
div.addEventListener("click", addsymbol)
mult.addEventListener("click", addsymbol)
subtract.addEventListener("click", addsymbol)
add.addEventListener("click", addsymbol)
square.addEventListener("click", addsymbol)

// Additional options
ac.addEventListener("click", deleteAll)
back.addEventListener("click", backspace)
point.addEventListener("click", adddot)
equal.addEventListener("click", calculate)