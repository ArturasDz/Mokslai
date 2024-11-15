/*
Write a JavaScript function to get the month name from a particular date. 

Test Data :
console.log(month_name(new Date("10/11/2009"))); 
console.log(month_name(new Date("11/13/2014")));
Output :
"October" 
"November"
*/
let month_name = function (month) {
  return new Date(month).toLocaleString("default", { month: "long" });
};
console.log(month_name(new Date("10/11/2009")));
console.log(month_name(new Date("11/13/2014")));
