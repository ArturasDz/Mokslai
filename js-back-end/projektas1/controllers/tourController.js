// const tours = require("../models/tourModel")
const {
  getAllTours,
  getTourById,
  createTour,
  patchTour,
  eraseTour,
} = require("../models/tourModel");

//GET ALL TOURS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await getAllTours();
    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//GET TOUR BY ID
exports.getTour = async (req, res) => {
  try {
    const id = +req.params.id;
    const tour = await getTourById(id);

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
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//CREATE TOUR
exports.postTour = async (req, res) => {
  try {
    const tour = req.body;
    const newTour = await createTour(tour);
    res.status(200).json({
      status: "success",
      data: newTour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//EDIT TOUR
exports.updateTour = async (req, res) => {
  const id = +req.params.id;
  try {
    const tour = req.body;
    const editTour = await patchTour(id, tour);
    //issiunciamas atsakymas
    res.status(200).json({
      status: "success",
      data: `Tour updated, Id: ${id}`, //newTour,
      editedTour: editTour,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//DELETE TOUR
exports.deleteTour = async (req, res) => {
  const id = +req.params.id;
  try {
    const deletedTour = await eraseTour(id);
    if (deletedTour) {
      res.status(200).json({
        status: "success",
        data: deletedTour,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
