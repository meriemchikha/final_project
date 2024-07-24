const AbstractManager = require("./AbstractManager");

class DetailOrderManager extends AbstractManager {
  constructor() {
    super({ table: "detail_order" });
  }

  async getInfo() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return [result];
  }

  insertCommandDetails(commandId, products) {
    console.info("commandId", commandId);
    // Insérer les produits dans la table command_details
    for (const product of products) {
      this.database.query(
        "INSERT INTO detail_order (command_id, product_id, quantity, size) VALUES (?, ?, ?, ?)",
        [commandId, product.product_id, product.quantity, product.size]
      );
    }
  }
}
module.exports = DetailOrderManager;
