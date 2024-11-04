"use strict";
const a = parseInt(prompt("Kiek yra monetų po 5 ct?"));
const b = parseInt(prompt("Kiek yra monetų po 20 ct?"));
const c = parseInt(prompt("Kiek yra monetų po 2 Lt?"));

const sum = 5 * a / 100 + 20 * b / 100 + 2 * c;
console.log("Taupyklėje yra" + " " + sum + " " + "Lt.");