const { sql } = require("../dbConnection");

exports.getAllForAdmin = async (limit = 10, offset = 0) => {
  const data = await sql`
    SELECT appointments.*, pets.name as pet_name, users.email as owner_email 
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    JOIN users ON pets.owner_id = users.id
    ORDER BY appointments.date DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [total] = await sql`
    SELECT COUNT(*) FROM appointments
  `;

  return {
    data,
    total: total.count
  };
};

exports.getAllForUser = async (userId, limit = 10, offset = 0) => {
  const data = await sql`
    SELECT appointments.*, pets.name as pet_name
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    WHERE pets.owner_id = ${userId}
    ORDER BY appointments.date DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [total] = await sql`
    SELECT COUNT(*) 
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    WHERE pets.owner_id = ${userId}
  `;

  return {
    data,
    total: total.count
  };
};

exports.getByIdAdmin = async (id) => {
  const [appointment] = await sql`
    SELECT appointments.*, pets.name as pet_name, users.email as owner_email
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    JOIN users ON pets.owner_id = users.id
    WHERE appointments.id = ${id}
  `;
  return appointment;
};

exports.getByIdUser = async (id, userId) => {
  const [appointment] = await sql`
    SELECT appointments.*, pets.name as pet_name
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    WHERE appointments.id = ${id}
    AND pets.owner_id = ${userId}
  `;
  return appointment;
};

exports.getByDateRangeAdmin = async (startDate, endDate) => {
  return await sql`
    SELECT appointments.*, pets.name as pet_name, users.email as owner_email
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    JOIN users ON pets.owner_id = users.id
    WHERE appointments.date BETWEEN ${startDate} AND ${endDate}
    ORDER BY appointments.date ASC
  `;
};

exports.getByDateRangeUser = async (userId, startDate, endDate) => {
  return await sql`
    SELECT appointments.*, pets.name as pet_name
    FROM appointments
    JOIN pets ON appointments.pet_id = pets.id
    WHERE pets.owner_id = ${userId}
    AND appointments.date BETWEEN ${startDate} AND ${endDate}
    ORDER BY appointments.date ASC
  `;
};

exports.create = async (petId, date, notes) => {
  const [appointment] = await sql`
    INSERT INTO appointments (pet_id, date, notes)
    VALUES (${petId}, ${date}, ${notes})
    RETURNING *
  `;
  return appointment;
};

exports.updateByAdmin = async (id, date, notes, status) => {
  const [appointment] = await sql`
    UPDATE appointments 
    SET date = COALESCE(${date}, date),
        notes = COALESCE(${notes}, notes),
        status = COALESCE(${status}, status)
    WHERE id = ${id}
    RETURNING *
  `;
  return appointment;
};

exports.updateByUser = async (id, userId, date, notes, rating) => {
  const [appointment] = await sql`
    UPDATE appointments
    SET date = COALESCE(${date}, appointments.date),
        notes = COALESCE(${notes}, appointments.notes),
        rating = COALESCE(${rating}, appointments.rating)
    FROM pets
    WHERE appointments.id = ${id} 
    AND appointments.pet_id = pets.id 
    AND pets.owner_id = ${userId}
    RETURNING *
  `;
  return appointment;
};

exports.deleteByAdmin = async (id) => {
  const [result] = await sql`
    DELETE FROM appointments WHERE id = ${id} RETURNING *
  `;
  return result;
};

exports.deleteByUser = async (id, userId) => {
  const [result] = await sql`
    DELETE FROM appointments
    USING pets
    WHERE appointments.id = ${id} 
    AND appointments.pet_id = pets.id 
    AND pets.owner_id = ${userId}
    RETURNING *
  `;
  return result;
};

exports.verifyPetOwner = async (petId, userId) => {
  const pets = await sql`
    SELECT * FROM pets WHERE id = ${petId} AND owner_id = ${userId}
  `;
  return pets.length > 0;
};