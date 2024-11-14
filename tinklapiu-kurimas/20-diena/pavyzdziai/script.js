//
const student = {
  id: 584,
  age: 51,
  firstName: "Vardednis",
  lastName: "Pavardenis",
  address: {
    city: "Wilno",
    zipCode: 15548,
    streetName: "Vilniaus g.",
    houseNumber: 15,
  },
  calculateMonthLived: function () {
    return this.age * 12;
  },
};

const { id, firstName, address } = student;

console.log(student.calculateMonthLived());
console.log(address.zipCode);

// kiekviena numeri atspausdina

const numbers = [1, 2, 4, 5];

const result = numbers.forEach((number) => console.log(number));

// zmoniu amziu padaugina is 2

const numbers1 = [
  { age: 21, name: "Jurgis" },
  { age: 18, name: "Antanas" },
  { age: 29, name: "Aloyzas" },
  { age: 35, name: "Martynas" },
];

const result1 = numbers1.map((person) => person.age * 2);

console.log(result1);

// suranda varda

const numbers2 = [
  { age: 21, name: "Jurgis" },
  { age: 18, name: "Antanas" },
  { age: 29, name: "Aloyzas" },
  { age: 35, name: "Martynas" },
];

const result2 = numbers2.find((person) => person.name === "Aloyzas");

console.log(result2);

// prideda visu age

const numbers3 = [
  { age: 21, name: "Jurgis" },
  { age: 18, name: "Antanas" },
  { age: 29, name: "Aloyzas" },
  { age: 35, name: "Martynas" },
];

const result3 = numbers3.reduce(
  (accumulator, person) => accumulator + person.age,
  0
);

console.log(result3);

//

const numbers4 = [
  { age: 21, name: "Jurgis" },
  { age: 18, name: "Antanas" },
  { age: 29, name: "Aloyzas" },
  { age: 35, name: "Martynas" },
];

const result4 = numbers4.reduce(
  (accumulator, person) => accumulator + person.age,
  0
);

console.log(result4 / numbers4.length);
