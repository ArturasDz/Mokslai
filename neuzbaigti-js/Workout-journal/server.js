const app = require("./app")
const dotenv = require("dotenv");

//load env
dotenv.config();
const port = process.env.PORT;

//server start
app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });