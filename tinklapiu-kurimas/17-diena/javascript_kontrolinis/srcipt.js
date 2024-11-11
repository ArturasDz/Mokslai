"use strict";
// 1
function sumEvenNumbers(n) {
  let sum = 0;
  for (let i = 0; i < n.length; i++) {
    if (n[i] % 2 === 0) {
      sum += n[i];
    }
  }
  return sum;
}

const numbers = [2, 4, 6, 8, 10, 12, 14, 16, 18];
const evenSum = sumEvenNumbers(numbers);
console.log("Suma: " + evenSum);

// 2

let findPositiveNumbers = [1, -3, 5, -3, 0];

for (let i = 0; i < findPositiveNumbers.length; i++) {
  if (findPositiveNumbers[i] > 0) {
    console.log("positive numbers: " + findPositiveNumbers[i]);
  }
}

// 3

let sum = 0;
let number = 0;
while (number != -1) {
  number = parseInt(prompt("Type a number: "));

  if (number > 0) sum = number + sum;
  else break;
  console.log("sum: " + sum);
}

//4

const friends = ["Rika", "Jacob", "Alex", "Oliver", "Monika"];

function filterItems(arr, friends) {
  return arr.filter((word) =>
    word.toLowerCase().includes(friends.toLowerCase())
  );
}

console.log(filterItems(friends, "ka"));
console.log(filterItems(friends, "e"));

//5
