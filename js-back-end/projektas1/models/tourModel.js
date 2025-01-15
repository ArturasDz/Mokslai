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
    SELECT tours.name as tour_name, categories.name, difficulties.level
    FROM tours
    JOIN difficulties ON tours.difficulty_id=difficulties.id
    JOIN categories ON tours.category_id=categories.id
    `;

  return tourList;
};

//GET TOURS BY CATEGORY
exports.getToursByCat = async (categoryid) => {
  const tours = await sql`
   SELECT tours.name as tour_name, categories.name, difficulties.level
    FROM tours
    JOIN difficulties ON tours.difficulty_id=difficulties.id
    JOIN categories ON tours.category_id=categories.id
    WHERE tours.category_id = ${categoryid}
  `;

  return tours;
};
//
exports.countToursByCat = async () => {
  const tours = await sql`
  SELECT
  categories.name AS category,
  COUNT(tours.id) AS totalCounts
  FROM tours
  JOIN categories ON tours.category_id=categories.id
  GROUP BY categories.name 
  `;

  return tours;
};
//GET TOURS BY DIFFICULTY
exports.getToursByDif = async (difficultyid) => {
  const tours = await sql`
   SELECT tours.name as tour_name, categories.name, difficulties.level
    FROM tours
    JOIN difficulties ON tours.difficulty_id=difficulties.id
    JOIN categories ON tours.category_id=categories.id
    WHERE tours.difficulty_id = ${difficultyid}
  `;

  return tours;
};
//GET TOUR BY CAT AND DIF
exports.getToursByCAndD = async (category, difficulty) => {
  const tours = await sql`
   SELECT tours.name as tour_name, categories.name AS category_name, difficulties.level AS difficulty_level
    FROM tours
    JOIN difficulties ON tours.difficulty_id=difficulties.id
    JOIN categories ON tours.category_id=categories.id
    WHERE categories.name = ${category} AND difficulties.level = ${difficulty}
  `;

  return tours;
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

exports.filterTours = async (filter) => {
  const tours = await sql`
  SELECT tours.*, difficulties.level as difficulty, categories.name as category
    FROM tours
    JOIN difficulties ON tours.difficulty_id = difficulties.id
    JOIN categories ON tours.category_id = categories.id
    WHERE
    tours.duration <= ${filter.duration} AND difficulties.level = ${filter.difficulty} AND tours.price <= ${filter.price}    
  `;

  return tours;
};
