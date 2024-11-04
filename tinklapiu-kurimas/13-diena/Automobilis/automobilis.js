"use strict"
const v = parseInt(prompt("Koks automobilio greitis?"));

const s = 264 / (v * 1000) * 60 * 60;
console.log("Automobilis tunelį pravažiuos per" + " " + s + " " +"s");