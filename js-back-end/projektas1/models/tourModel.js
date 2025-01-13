//IF WITHOUT DB =>
// const fs = require("fs");
// const path = require("path");

// const dir = path.join(__dirname, "../data/tours-simple.json");

// const tours = JSON.parse(fs.readFileSync(dir));

// module.exports = tours;
const { sql } = require("../dbConnection");

//GET ALL TOURS
exports.getAllTours = async () => {
  const tourList = await sql`
    SELECT tours.*
    FROM tours
    `;

  return tourList;
};

//GET TOUR BY ID
exports.getTourById = async (id) => {
  const tours = await sql`
SELECT tours.*
FROM tours
WHERE tours.id = ${id}
`;

  return tours[0]; //tours is array
};

//CREATE TOUR
exports.createTour = async (tour) => {
  const columns = [
    "name",
    "description",
    "category",
    "price",
    "duration",
    "difficulty",
  ];

  const postTour = await sql`
    insert into tours ${sql(tour, columns)}
    RETURNING *
    `;

  return postTour[0];
};

//EDIT TOUR
exports.patchTour = async (id, tour) => {
  const columns = Object.keys(tour);
  const editTour = await sql`
    update tours set ${sql(tour, columns)}
    where tours.id = ${id}
    RETURNING *
    `;

  return editTour[0];
};

//DELETE TOUR
exports.eraseTour = async (id) => {
  const removeTour = await sql`
    delete from tours 
    where tours.id = ${id}
    RETURNING *
    `;

  return removeTour[0];
};
