"use strict";

/*
    Select HTML elements
*/
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const calculateButton =
    document.getElementById("calculateButton");

const resetButton =
    document.getElementById("resetButton");

const bmiValue =
    document.getElementById("bmiValue");

const bmiCategory =
    document.getElementById("bmiCategory");

const errorMessage =
    document.getElementById("errorMessage");


/*
    Calculate BMI

    Formula:
    BMI = weight / height²

    Height must be in metres.
*/
function calculateBMI(weight, heightInMeters) {

    return weight /
        (heightInMeters * heightInMeters);
}


/*
    Determine BMI category
*/
function getBMICategory(bmi) {

    if (bmi < 18.5) {

        return "Underweight";

    } else if (bmi < 25) {

        return "Normal Weight";

    } else if (bmi < 30) {

        return "Overweight";

    } else {

        return "Obesity";
    }
}


/*
    Validate input values
*/
function validateInputs(height, weight) {

    if (height === "" || weight === "") {

        return "Please enter both height and weight.";

    }

    const heightNumber = Number(height);
    const weightNumber = Number(weight);


    if (
        !Number.isFinite(heightNumber) ||
        !Number.isFinite(weightNumber)
    ) {

        return "Please enter valid numeric values.";

    }


    if (heightNumber <= 0 || weightNumber <= 0) {

        return "Height and weight must be greater than zero.";

    }


    return "";
}


/*
    Display error message
*/
function showError(message) {

    errorMessage.textContent = message;

    bmiValue.textContent = "--";

    bmiCategory.textContent =
        "Enter valid details to calculate BMI.";
}


/*
    Clear error message
*/
function clearError() {

    errorMessage.textContent = "";
}


/*
    Calculate and display BMI
*/
function handleCalculation() {

    const height = heightInput.value.trim();
    const weight = weightInput.value.trim();


    /*
        Validate input
    */
    const validationMessage =
        validateInputs(height, weight);


    if (validationMessage !== "") {

        showError(validationMessage);

        return;
    }


    clearError();


    /*
        Convert height from centimetres to metres
    */
    const heightNumber = Number(height);
    const weightNumber = Number(weight);

    const heightInMeters =
        heightNumber / 100;


    /*
        Calculate BMI
    */
    const bmi =
        calculateBMI(weightNumber, heightInMeters);


    /*
        Round BMI to two decimal places
    */
    const roundedBMI =
        bmi.toFixed(2);


    /*
        Determine category
    */
    const category =
        getBMICategory(bmi);


    /*
        Display result
    */
    bmiValue.textContent = roundedBMI;

    bmiCategory.textContent =
        `Category: ${category}`;
}


/*
    Calculate button event
*/
calculateButton.addEventListener(
    "click",
    handleCalculation
);


/*
    Allow Enter key to calculate
*/
heightInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            handleCalculation();
        }
    }
);


weightInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            handleCalculation();
        }
    }
);


/*
    Reset the calculator
*/
resetButton.addEventListener(
    "click",
    function () {

        heightInput.value = "";
        weightInput.value = "";

        bmiValue.textContent = "--";

        bmiCategory.textContent =
            "Enter your details to calculate BMI.";

        clearError();

        heightInput.focus();
    }
);