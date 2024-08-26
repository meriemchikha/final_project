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

  async addCart(userId) {
    if (!userId) {
      throw new Error("User ID cannot be null");
    }

    // Vérifie si un panier existe déjà pour cet utilisateur
    const [existingCart] = await this.database.query(
      `SELECT id FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );

    if (existingCart.length > 0) {
      return existingCart[0]; // Renvoie le panier existant si trouvé
    }

    // Insère un nouveau panier si aucun n'existe
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id) VALUES (?)`,
      [userId]
    );

    // Récupère le nouveau panier inséré
    const [newCart] = await this.database.query(
      `SELECT id, user_id FROM ${this.table} WHERE id = ?`,
      [result.insertId]
    );

    return newCart[0];
  }

  async getCartByUser(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [id]
    );
    return [rows];
  }
}
module.exports = AvisManager;
