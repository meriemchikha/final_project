/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductCatManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  async getAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return [result];
  }

  async add(name, description) {
    const [result] = await this.database.query(
      `insert into ${this.table} (
    name,
    description 
    )
    values (?, ?)`,
      [name, description]
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

  async getCatById(id) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE id=?`, [id]);
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
