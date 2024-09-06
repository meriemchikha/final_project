/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductInCartManager extends AbstractManager {
  constructor() {
    super({ table: "payment" });
  }

  async create(paypal_payment_id, total_price) {
    const [result] = await this.database.query(
      `INSERT INTO payment (paypal_payment_id, total_price) VALUES (?, ?)`,
      [paypal_payment_id, total_price]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all payment from the "payment" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of payment
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific payment by its ID
    return this.database.query(`select * from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = ProductInCartManager;
