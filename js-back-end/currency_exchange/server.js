const app = require("./app");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;
const apiKey = process.env.API_KEY; //GET THE API FROM .ENV 

//SET UP A ROUTE TO FETCH EXCHANGE RATES
app.get("/exchange-rates", (req, res) => {
  //THE BASE URL FOR THE EXCHANGERATE API
  const url = `https://api.exchangerate-api.com/v4/latest/USD?apikey=${apiKey}`;

  //MAKE AN API REQUEST USING AXIOS
  axios
    .get(url)
    .then((response) => {
      //HANDLE THE RESPONSE FROM THE API
      const rates = response.data.rates; //EXCHANGE RATES DATA
      res.json(rates); //SEND THE EXCHANGE RATES AS A JSON RESPONSE
    })
    .catch((error) => {
      console.error("Error fetching exchange rates:", error);
      res.status(500).send("Internal Server Error"); //SEND A 500 ERROR IF THE REQUEST FAILS
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
