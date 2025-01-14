// const tours = require("../models/tourModel")
const {
  getAllTours,
  getTourById,
  createTour,
  patchTour,
  eraseTour,
  getToursByCat,
  getToursByDif,
  countToursByCat,
  getToursByCAndD,
  filterTours,
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
//GET TOURS BY CATEGORY
exports.getToursByCategoryId = async (req, res) => {
  try {
    const { categoryid } = req.params;
    if (!categoryid || isNaN(categoryid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }
    const tours = await getToursByCat(categoryid);
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
//GET TOURS BY CAT AND DIF
exports.getToursByCatAndDif = async (req, res) => {
  try {
    const { category, difficulty } = req.params;
    const tours = await getToursByCAndD(category, difficulty);

    if (tours.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No tours found",
      });
    }
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
//GET ALL TOURS COUNTED BY CAT
exports.getToursCountedByCat = async (req, res) => {
  try {
    const tours = await countToursByCat();
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
//GET TOURS BY DIFFICULTY
exports.getToursByDifficultyId = async (req, res) => {
  try {
    const { difficultyid } = req.params;
    if (!difficultyid || isNaN(difficultyid)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing ID",
      });
    }
    const tours = await getToursByDif(difficultyid);
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

//FILTERED TOURS
// exports.getFilteredTours = async (req, res) => {
//  try {
//    const filter = req.query;
//     const filteredTours = filterTours(filter);

//     console.log(filteredTours);
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

//2. filter tours using query string
exports.getFilteredTours = async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);

    // If no query string, return all tours
    if (Object.keys(filter).length === 0) {
      const tours = await getAllTours();
      res.status(200).json({
        status: "success",
        data: tours,
      });
      return;
    }

    // Validate filter fields
    const allowedFields = ["duration", "difficulty", "price", "sort"];
    for (const key of Object.keys(filter)) {
      if (!allowedFields.includes(key)) {
        return res.status(400).json({
          status: "fail",
          message: `Invalid filter field: '${key}'. Allowed fields are: ${allowedFields.join(
            ", "
          )}`,
        });
      }
    }

    // Validate numeric parameters
    if (!Number(filter.duration) || filter.duration < 0) {
      throw new Error("Invalid duration");
    }
    if (!Number(filter.price) || filter.price < 0) {
      throw new Error("Invalid price");
    }

    // Validate difficulty against allowed values
    const validDifficulties = ["Easy", "Medium", "Difficult"];
    if (!validDifficulties.includes(filter.difficulty)) {
      throw new Error("Invalid difficulty");
    }

    // If query string, return filtered tours
    const filteredTours = await filterTours(filter);

    res.status(200).json({
      status: "success",
      data: filteredTours,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
