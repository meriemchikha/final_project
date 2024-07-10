const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // eslint-disable-next-line camelcase
  async create(firstname, lastname, email, hashPassword, phone_mobile) {
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, email, hashPassword, phone_mobile) values (?, ?, ?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [firstname, lastname, email, hashPassword, phone_mobile]
    );
    return result;
  }

  async getAllUser() {
    // Execute the SQL SELECT query to retrieve all produits from the "produits" table
    const [rows] = await this.database.query(`select *from ${this.table}`);

    // Return the array of users
    return rows;
  }

  updateUserWithOutPassword(id, userWithoutpassword) {
    const columns = Object.keys(userWithoutpassword);
    const valuesColumns = Object.values(userWithoutpassword);
    const values = columns.map((column) => `${column} = ?`).join(", ");

    return this.database.query(
      `UPDATE ${this.table} set ${values} where id=?`,
      [...valuesColumns, id]
    );
  }

  updateUserOnlyPassword(id, hashPassword) {
    return this.database.query(
      `UPDATE ${this.table} set hashPassword = ? where id=?`,
      [hashPassword, id]
    );
  }

  getUserByEmail(email) {
    return this.database.query(`select * from ${this.table} where email=?`, [
      email,
    ]);
  }

  getUserById(id) {
    return this.database.query(
      `SELECT firstname, lastname, email, phone_mobile FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }
}
module.exports = userManager;
