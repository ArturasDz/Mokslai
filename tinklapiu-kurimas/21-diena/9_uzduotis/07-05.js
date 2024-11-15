/*
 Write a JavaScript function to convert a string in abbreviated form. 
Test Data :
console.log(abbrev_name("Robin Singh"));
"Robin S."
*/
const abbrev_name = function (input) {
  const fullName = input.split(" ");
  return fullName[0] + " " + fullName[1].charAt(0) + ".";
};
console.log(abbrev_name("Robin Singh"));
