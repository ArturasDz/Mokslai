const axios = require("axios");

exports.getRateBasedOnCurrency = (req, res) => {
  const apiKey = process.env.API_KEY;
  const baseCurrency = req.params.base.toUpperCase();
  const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}?apikey=${apiKey}`;

  axios
    .get(url)
    .then((res) => {
      const rates = res.data.rates;
      res.status(200).json({
        status: "success",
        data: rates,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
};
