/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CommandeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "commade" as configuration
    super({ table: "commandes" });
  }

  async create(montant_total) {
    const [result] = await this.database.query(
      `insert into ${this.table} (montant_total) values (?)`,
      // eslint-disable-next-line camelcase
      [montant_total]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all commandes from the "commandes" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific commandes by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the commandes
    return rows[0];
  }
}
module.exports = CommandeManager;
