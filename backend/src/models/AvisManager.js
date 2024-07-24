/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class AvisManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Avis" as configuration
    super({ table: "avis" });
  }

  async create(firstname, comment, note) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, comment, note) values (?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [firstname, comment, note]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Avis from the "Avis" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Avis by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Avis
    return rows[0];
  }

  editAvis(id, firstname, comment, note) {
    return this.database.query(
      `UPDATE ${this.table} set firstname = ?, comment = ?, note = ? where id=?`,
      [firstname, comment, note, id]
    );
  }

  async deleteAvis(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}
module.exports = AvisManager;
