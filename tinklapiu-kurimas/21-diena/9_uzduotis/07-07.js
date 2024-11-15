/*
Write a JavaScript function to parameterize a string. 
Test Data :
console.log(string_parameterize("Robin Singh from USA."));
"robin-singh-from-usa"
*/

const string_parameterize = function (input) {
  const lowerCase = input.toLowerCase();
  const input1 = lowerCase.split(" ").join("-");
  const result = input1.replace(".", "");
  return result;
};
console.log(string_parameterize("Robin Singh from USA."));
