const { sql } = require('../dbConnection');

exports.getAllTours = async (limit, offset) => {
  const tours = await sql`
  SELECT tours.*
    FROM tours
    ORDER BY tours.id ASC
     ${
       !isNaN(limit) && !isNaN(offset)
         ? sql`LIMIT ${limit} OFFSET ${offset}`
         : sql``
     }  
    `;
  // he query will not guarantee that the results are returned in table order unless an explicit ORDER BY clause is included.
  const total = await sql`
      SELECT COUNT(*)::int AS count 
      FROM tours
    `;

  return { tours, totalCount: total[0].count };
};

//filter tours using query string
exports.filterTours = async (filter) => {
  // filter = { duration: '5', difficulty: 'easy', price: '100', sort: 'asc' }

  // Validate filter values to prevent SQL injection
  const validDirections = ['ASC', 'DESC'];
  const sortDirection = validDirections.includes(filter.sort.toUpperCase())
    ? filter.sort.toUpperCase()
    : 'ASC';

  const tours = await sql`
  SELECT tours.*, difficulties.level as difficulty, categories.name as category
    FROM tours
    JOIN difficulties ON tours.difficulty_id = difficulties.id
    JOIN categories ON tours.category_id = categories.id
    WHERE 
    tours.duration <= ${filter.duration} AND difficulties.level = ${
    filter.difficulty
  } AND tours.price <= ${filter.price}   
    ORDER BY tours.price ${sql.unsafe(sortDirection)}  
   `;
  //DESC and ASC is numeric value, so we need to multiply by 1 to convert it to number
  return tours;
};

exports.getTourById = async (id) => {
  const tours = await sql`
  SELECT tours.*, difficulties.level as difficulty 
    FROM tours
    JOIN difficulties ON tours.difficulty_id = difficulty.id
    WHERE tours.id = ${id};
    `;
  return tours[0]; //tour is an array, so we need to return the first element
};

exports.createTour = async (newTour) => {
  const tours = await sql`
    INSERT INTO tours ${sql(
      newTour,
      'name',
      'description',
      'category',
      'price',
      'duration',
      'difficulty'
    )}
       RETURNING *;
    `;
  return tours[0];
};

exports.updateTour = async (id, updatedTour) => {
  const tours = await sql`
  update tours set ${sql(
    updatedTour,
    'name',
    'description',
    'category',
    'price',
    'duration',
    'difficulty'
  )}
  where id = ${id}
  returning *;
`;
  return tours[0];
};

exports.getDifficultyById = async (id) => {
  const difficulties = await sql`
  SELECT difficulties.*
   FROM difficulties
   WHERE difficulties.id = ${id};
   `;
  return difficulties[0];
};

exports.getTourByName = async (name) => {
  const tours = await sql`
SELECT tours.*
FROM tours
WHERE tours.name = ${name};
`;
  return tours[0];
};
