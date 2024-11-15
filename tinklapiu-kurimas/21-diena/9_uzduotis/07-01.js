/*
 Write a JavaScript function to check whether an `input` is a string or not. 
Test Data :
console.log(is_string('w3resource'));
true
console.log(is_string([1, 2, 4, 0]));
false
*/
const is_string = function (string) {
  if (Object.prototype.toString.call(string) === "[object String]") return true;
  return false;
};
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 4, 0]));
