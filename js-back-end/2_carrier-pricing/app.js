const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//env
dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/carrier-data.json");

//server
const app = express();
app.use(express.json());

//controllers
const postDistance = (res, req) => {
  const postCode1 = req.body.postCode11
  const postCode2 = req.body.postCode22 
  const firstNumber = postCode1.match(/\d+/g).join("");
  const secondNumber = postCode2.match(/\d+/g).join("");
  if (!firstNumber || !secondNumber) {
    return res.status(400).json({
      error: "Both postcodes must contain numbers.",
    });
  }
  const number1 = parseInt(firstNumber, 10);
  const number2 = parseInt(secondNumber, 10);
  distance = number2 - number1;
  // const pickupPostCode = "SW1A1AA"
  // const integer = parseInt(pickupPostCode)
  //     console.log(integer);
  res.status(200).json({
    pickup_postcode: postCode11,
    delivery_postcode: postCode22,
    distance_km: distance,
  });
};

//routes

app.route("/carier").post(postDistance);

//app running
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
