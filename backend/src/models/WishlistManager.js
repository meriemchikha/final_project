const AbstractManager = require("./AbstractManager");

class WishlistManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Wishlist" as configuration
    super({ table: "Wishlist" });
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Wishlist from the "Wishlist" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Wishlist by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Avis
    return rows[0];
  }
}
module.exports = WishlistManager;
