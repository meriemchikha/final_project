/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class PaiementManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Paiement" as configuration
    super({ table: "Paiement" });
  }

  async create(montant) {
    const [result] = await this.database.query(
      `insert into ${this.table} (montant) values (?)`,
      // eslint-disable-next-line camelcase
      [montant]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all Paiement from the "Paiement" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Paiement by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the Paiement
    return rows[0];
  }

  // editPaiement(montant) {
  //     return this.database.query(
  //       `UPDATE ${this.table} set montant = ? where id=?`,
  //       [montant, id]
  //     );
  //   }

  //   async deleteAvis(id) {
  //     return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  //   }
}
module.exports = PaiementManager;
