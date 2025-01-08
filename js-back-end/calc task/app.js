const express = require("express");
const dotenv = require("dotenv");
//server
const app = express();
dotenv.config();
const port = process.env.PORT;
//calculation app
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome!");
});
const validateNumbers = (req, res, next) => {
  const { a , b } = req.query;
  if (!a || !b) {
    return res.status(400)({
      message: "please provide a and b as query",
    });
  }
  if (isNaN(a) || isNan(b)) {
    return res.status(400)({
      message: "one of the queries are not a number",
    });
  }
  next();
};
//addition
app.get("/addition", validateNumbers, (req, res) => {
  const { a, b } = req.query;
  const result = parseFloat(a) + parseFloat(b);
  res.json({
    opertion: "addition",
    a: parseFloat(a),
    b: parseFloat(b),
    result,
  });
  console.log(result);
  
});
// //subtraction
// app.get("/subtraction", (req, res) => {
//   res.status(200);
//   res.send("Hello, World");
// });
// //multiplication
// app.get("/multiplication", (req, res) => {
//   res.status(200);
//   res.send("Hello, World");
// });
// //division
// app.get("/division", (req, res) => {
//   res.status(200);
//   res.send("Hello, World");
// });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
