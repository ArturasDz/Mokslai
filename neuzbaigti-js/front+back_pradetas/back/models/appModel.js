const { sql } = require("../dbConnection");

exports.createTicket = async (newTicket) => {
    const columns = ["fullname", "email", "gitusername"]
    const [ticket] = await sql`
    INSERT INTO tickets ${sql(newTicket, columns)}
    RETURNING *
    `;

    return ticket
}

exports.findEmail = async (email) => {
    const [ticketsEmail] = await sql`
    SELECT tickets.*
    FROM tickets
    WHERE tickets.email = ${email}
    `;

    return ticketsEmail
}