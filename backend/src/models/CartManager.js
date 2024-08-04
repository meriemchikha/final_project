const AbstractManager = require("./AbstractManager");

class AvisManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "cart" as configuration
    super({ table: "cart" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all panier from the "Avis" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async addCart(id) {
    if (!id) throw new Error("User ID cannot be null");
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [id]
    );
    return result;
  }
}
module.exports = AvisManager;
