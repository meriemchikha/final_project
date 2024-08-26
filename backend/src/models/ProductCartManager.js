/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductInCartManager extends AbstractManager {
  constructor() {
    super({ table: "product_cart" });
  }

  async getAllProductsInCart() {
    const [result] = await this.database.query(`SELECT *
  FROM ${this.table};`);
    return [result];
  }

  async readProductInCart(cart_id) {
    const [rows] = await this.database.query(
      `SELECT p.*
FROM product_cart pc
JOIN product p ON pc.product_id = p.id
WHERE pc.cart_id = ?`,
      [cart_id]
    );
    // return rows[0];
    return [rows];
  }

  // async readProductInCart(cartId) {
  //   const [rows] = await this.database.query(
  //     `select *
  // from ${this.table}
  // WHERE cart_id = ?`,
  //     [cartId]
  //   );
  //   // return rows[0];
  //   return [rows];
  // }

  async addProductInCart(quantity, productId, cartId) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
     quantity,
      product_id,
      cart_id)
    VALUES (?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [quantity, productId, cartId]
    );
    return result;
  }

  async deleteProductInCart(productId) {
    return this.database.query(
      "DELETE FROM product_cart WHERE  product_id = ?",
      [productId]
    );
  }

  async editQuantity(id, quantity, cart_id) {
    return this.database.query(
      `UPDATE ${this.table} SET quantity = ? WHERE id = ? && cart_id =?`,
      [cart_id, quantity, id] // Ensure parameters match the query placeholders
    );
  }
}

module.exports = ProductInCartManager;
