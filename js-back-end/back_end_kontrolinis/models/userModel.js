const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
    const [user] = await sql`
    INSERT INTO users ${sql(newUser, "name", "password")}
    RETURNING *
    `;
    return user;
}

exports.getUserByName = async (name) => {
    const [user] = await sql`
    SELECT users.*
    FROM users
    WHERE users.name = ${name}
    `;
    return user;
}
