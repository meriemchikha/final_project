/* eslint-disable no-undef */
const AbstractManager = require("./AbstractManager");

class ProduitManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "produits" as configuration
    super({ table: "product" });
  }

  // eslint-disable-next-line camelcase
  async create(name, description, price, stock, img_url) {
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description, price, stock, img_url) values (?, ?, ?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [name, description, price, stock, img_url]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all produits from the "produits" table
    const [rows] = await this.database.query(`select *from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific produit by its ID
    const [rows] = await this.database.query(
      `select nom, description from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the produits
    return rows[0];
  }

  async deleteProduit(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}
module.exports = ProduitManager;
