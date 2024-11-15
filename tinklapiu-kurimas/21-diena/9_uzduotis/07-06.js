/*
Write a JavaScript function to hide email addresses to protect from unauthorized user. 
Test Data :
console.log(protect_email("robin_singh@example.com"));
"robin...@example.com"
*/

const protect_email = function (email) {
  const splitEmail = email.split("@");
  const splitEmail1 = splitEmail[0].slice(0, 5);
  const splitEmail2 = splitEmail[1];
  return splitEmail1 + "...@" + splitEmail2;
};
console.log(protect_email("robin_singh@example.com"));
