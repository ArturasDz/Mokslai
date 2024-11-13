"use strict";

const calculate = function (num1, num2, operator) {
  let result = 0;

  try {
    if (operator == "+") {
      result = num1 + num2;
    } else if (operator == "-") {
      result = num2 - num1;
    } else if (operator == "*") {
      result = num1 * num2;
    } else if (operator == "/") {
      result = num1 / num2;
    }

    if (
      operator != "+" &&
      operator != "-" &&
      operator != "*" &&
      operator != "/"
    ) {
      throw new Error("Invalid operation");
    }
    if (num2 === 0) {
      throw new Error("Cannot divide by zero");
    }
  } catch (error) {
    console.error(error);
  }
  return result;
};

console.log(calculate(10, 2, "+"));
console.log(calculate(10, 2, "/"));
console.log(calculate(10, 0, "/"));
console.log(calculate(10, 2, "&"));
