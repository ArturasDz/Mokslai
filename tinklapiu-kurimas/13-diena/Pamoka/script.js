"use strict";
const pirmadienis = parseInt(prompt("Kiek pamokų yra pirmadienį?"));
const antradienis = parseInt(prompt("Kiek pamokų yra antradienį?"));
const trečiadienis = parseInt(prompt("Kiek pamokų yra trečiadienį?"));
const ketvirtadienis = parseInt(prompt("Kiek pamokų yra ketvirtadienį?"));
const penktadienis = parseInt(prompt("Kiek pamokų yra penktadienį?"));
const sum = pirmadienis + antradienis + trečiadienis + ketvirtadienis + penktadienis;
const minuciuSuma = sum * 45;
console.log("Pamokų skaičius:" + sum);
console.log("Tai sudaro minučių:" + minuciuSuma);

