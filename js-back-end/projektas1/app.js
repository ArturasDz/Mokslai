const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

//load env variables
dotenv.config();
const port = process.env.PORT;
const dir = path.join(__dirname, "/data/tours-simple.json");

//create server
const app = express();

//converts incoming json data to js object and puts it to req.body
app.use(express.json());

//middlewares *************************
const sayHello = (req, res, next) => {
  console.log("Hello from middleware");
  next();
};

const addRequestedDate = (req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
};

const deletedMiddleware = (req, res, next) => {
  console.log("Delete middleware fired");
  
 next();
}
// *************************************


const tours = JSON.parse(fs.readFileSync(dir));
// console.log(tours);


//controller **************************
const getAllTours = (req, res) => {
  res.status(200).json({
    //gali buti fail arba error
    status: "success",
    count: tours.length,
    date: req.requestedTime,
    data: tours,
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: tour,
  });
};

const postTour = (req, res) => {
  // console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newID,
    ...req.body,
  };
  tours.push(newTour);

  fs.writeFile(dir, JSON.stringify(tours), () => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Error writing file",
      });
    }
    res.status(201).json({
      status: "success",
      data: newTour,
    });
  });
};

const updateTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  //requesting body
  const newTour = req.body;
  //issiunciamas atsakymas
  res.status(200).json({
    status: "success",
    data: `Tour updated, Id: ${id}`, //newTour,
  });
};

const deleteTour = (req, res) => {
  // const id = +req.params.id;

  // fs.writeFile(dir, JSON.stringify(tours), () => {
  // if (id > tours.length) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: "Invalid ID",
  //   });
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: `Tour with Id: ${id} deleted successfully`,
  // })
  // })
  const id = +req.params.id;

  const filteredTours = tours.filter((tour) => tour.id !== Number(id));
  if (id < tours.length + 1) {
    res.status(200).json({
      status: "success",
      data: filteredTours,
    });
  }
  res.status(404).json({
    status: "fail",
    message: "Invalid ID",
  });
};
// **********************************************


app.use(sayHello, addRequestedDate);
// app.use(addRequestedDate);

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour );
// app.post("/api/v1/tours", postTour);
//update su patch // yra put(visa tura) it patch(tik dali, kuri atsiusim) metodai
//su patch
// app.patch("/api/v1/tours/:id", updateTour);
//delete method
app.delete("/api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(deletedMiddleware, postTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
