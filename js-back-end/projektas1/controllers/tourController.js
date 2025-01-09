const tours = require("../models/tourModel")

exports.getAllTours = (req, res) => {
    res.status(200).json({
      //gali buti fail arba error
      status: "success",
      count: tours.length,
      date: req.requestedTime,
      data: tours,
    });
  };
  
  exports.getTour = (req, res) => {
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
  
  exports.postTour = (req, res) => {
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
  
  exports.updateTour = (req, res) => {
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
  
  exports.deleteTour = (req, res) => {
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