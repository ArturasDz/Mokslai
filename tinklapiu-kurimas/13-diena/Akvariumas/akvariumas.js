"use strict";
const a = parseInt(prompt("Kiek žuvų gyvena akvariume?"));
const b = parseInt(prompt("Kiek žuvų į akvariumą įdedama kiekvieną dieną?"));
const n = parseInt(prompt("Kiek dienų praėjo?"));
const sum = b * n + a;
console.log("po 3 dienų akvariume gyvens" + " " + sum + " " + "žuvų");
