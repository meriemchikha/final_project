/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class AvisManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Avis" as configuration
    super({ table: "avis" });
  }

  async create(comment, user_id, product_id) {
    const [result] = await this.database.query(
      `insert into ${this.table} (comment, user_id, product_id) values (?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [comment, user_id, product_id]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Avis from the "Avis" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(product_id) {
    // Execute the SQL SELECT query to retrieve a specific Avis by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where product_id = ?`,
      [product_id]
    );

    // Return the first row of the result, which represents the Avis
    return rows[0];
  }

  editAvis(id, comment) {
    return this.database.query(
      `UPDATE ${this.table} set comment = ? where id=?`,
      [comment, id]
    );
  }

  async deleteAvis(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}
module.exports = AvisManager;
