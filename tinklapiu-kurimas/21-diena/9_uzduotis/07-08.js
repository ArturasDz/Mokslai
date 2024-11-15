/*
Write a JavaScript function to capitalize the first letter of a string. 
Test Data :
console.log(capitalize('js string exercises'));
"Js string exercises"
*/
const capitalize = function (input) {
  firstLetter = input.charAt(0).toUpperCase();
  removeFirstLetter = input.substring(1);
  return firstLetter + removeFirstLetter;
};
console.log(capitalize("js string exercises"));
