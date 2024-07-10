const AbstractManager = require("./AbstractManager");

class CategoriesManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "category" });
  }

  async create(nom, description) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, description) values (?, ?)`,
      // eslint-disable-next-line camelcase
      [nom, description]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all catégories from the "categories" table
    const [rows] = await this.database.query(
      `select id, nom, description from ${this.table}`
    );

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific categories by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the categories
    return rows[0];
  }

  async deleteCatg(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}
module.exports = CategoriesManager;
