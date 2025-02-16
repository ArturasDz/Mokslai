const { sql } = require("../dbConnection");

exports.getAllForAdmin = async (limit = 10, offset = 0) => {
  const data = await sql`
    SELECT 
    appointments.*, users.email as owner_email, users.username as owner_name
    FROM appointments
    LEFT JOIN users ON appointments.user_id = users.id
    ORDER BY appointments.date DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [total] = await sql`
    SELECT COUNT(*) FROM appointments
  `;
  return {
    data,
    total: total.count,
  };
};

exports.getAllForUser = async (userId, limit = 10, offset = 0) => {
  const data = await sql`
    SELECT 
      appointments.*,
      users.username as owner_name
    FROM appointments
    LEFT JOIN users ON appointments.user_id = users.id
    WHERE appointments.user_id = ${userId}
    ORDER BY appointments.date DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  const [total] = await sql`
    SELECT COUNT(*) 
    FROM appointments
    WHERE user_id = ${userId}
  `;
  return {
    data,
    total: total.count,
  };
};

exports.getByIdAdmin = async (id) => {
  const [appointment] = await sql`
    SELECT appointments.*,users.email as owner_email
    FROM appointments
    WHERE appointments.id = ${id}
  `;
  return appointment;
};

exports.getByDateRangeAdmin = async (startDate, endDate) => {
  return await sql`
    SELECT appointments.*,users.email as owner_email
    FROM appointments
    WHERE appointments.date BETWEEN ${startDate} AND ${endDate}
    ORDER BY appointments.date ASC
  `;
};

exports.getByDateRangeUser = async (startDate, endDate) => {
  return await sql`
    SELECT appointments.*
    FROM appointments
    AND appointments.date BETWEEN ${startDate} AND ${endDate}
    ORDER BY appointments.date ASC
  `;
};

exports.create = async (pet_name, username, date, time, notes) => {
  const [appointment] = await sql`
    INSERT INTO appointments (user_id, pet_name, date, time, notes) 
    VALUES (
      (SELECT id FROM users WHERE username = ${username}),
      ${pet_name},
      ${date},
      ${time},
      ${notes}
    ) RETURNING *
  `;
  return appointment;
};

exports.updateByAdmin = async (id, date, time, notes, status) => {
  const [appointment] = await sql`
    UPDATE appointments 
    SET 
    date = COALESCE(${date}, date),
    time = COALESCE(${time}, time),
    notes = COALESCE(${notes}, notes),
    status = COALESCE(${status}, status)
    WHERE id = ${id}
    RETURNING *
  `;
  return appointment;
};

exports.updateByUser = async (id, userId, date, time, notes) => {
  const [appointment] = await sql`
    UPDATE appointments
    SET 
    date = COALESCE(${date}, appointments.date),
    time = COALESCE(${time}, appointments.time),
    notes = COALESCE(${notes}, appointments.notes)
    WHERE appointments.id = ${id} AND appointments.user_id = ${userId}
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
    WHERE appointments.id = ${id} and appointments.user_id = ${userId}
    RETURNING *
  `;
  return result;
};
