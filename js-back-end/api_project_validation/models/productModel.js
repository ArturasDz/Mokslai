const { sql } = require("../dbConnection");

exports.allProducts = async () => {
  const result = await sql`
    SELECT products.* 
    FROM products
    `;
  return result;
};

exports.filterProducts = async (filter) => {
  const result = await sql`
    SELECT products.* 
    FROM products
    WHERE products.category = ${filter.category} AND products.price <= ${filter.price}
    `;
  return result;
};
