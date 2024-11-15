/*
Write a JavaScript function to get the current date. 

Note : Pass a separator as an argument.
Test Data :
console.log(curday('/')); 
console.log(curday('-'));
Output :
"11/13/2014" 
"11-13-2014"
*/
let curday = function (symbol) {
  today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return month + symbol + day + symbol + year;
};
console.log(curday("/"));
console.log(curday("-"));
