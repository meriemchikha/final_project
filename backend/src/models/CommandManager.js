/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class CommandManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "commade" as configuration
    super({ table: "command" });
  }

  async create(payment, statut, cart_id, payment_id) {
    const [result] = await this.database.query(
      `insert into ${this.table} (payment, statut, cart_id, payment_id) values (?, ?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [payment, statut, cart_id, payment_id]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all commandes from the "commandes" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id, userId) {
    // Execute the SQL SELECT query to retrieve a specific commandes by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where  id = ? and user_id = ?`,
      [id, userId]
    );

    // Return the first row of the result, which represents the commandes
    return rows[0];
  }

  async getAllCommandByUser(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [id]
    );
    return [rows];
  }
}
module.exports = CommandManager;
