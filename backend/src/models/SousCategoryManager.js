/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductCatManager extends AbstractManager {
  constructor() {
    super({ table: "sous_category" });
  }

  async getAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return [result];
  }

  async getAllSousCategInCateg(categoryId) {
    const [result] = await this.database.query(
      `
SELECT sc.*
FROM sous_category sc
JOIN category c ON sc.category_id = c.id
WHERE c.id = ?`,
      [categoryId]
    );
    return result;
  }

  async add(name, description, category_id) {
    const [result] = await this.database.query(
      `insert into ${this.table} (
    name,
    description, 
    category_id
    )
    values (?, ?, ?)`,
      [name, description, category_id]
    );
    return result;
  }

  async updateProductCat(id, name, description) {
    console.info("id", id);
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ? WHERE id = ? 
    `,
      [name, description, id]
    );
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific produit by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the produits
    return rows[0];
  }

  async deleteProductCat(id) {
    const [rows] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = ProductCatManager;
