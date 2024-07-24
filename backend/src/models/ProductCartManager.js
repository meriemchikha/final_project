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

  async readProductByUser(cart_id) {
    const [rows] = await this.database.query(
      `select product_cart.*, product.id AS id_product, 
     product.name ,
  product.description,
  product.price,
  product.img_url,
  product.stock,
  product.product_category_id,
  product_category.name AS product_category_name,
  sous_product_category.name AS sous_product_category_name
  from ${this.table} INNER JOIN product ON 
  product_cart.product_id = product.id INNER JOIN product_category ON product.product_category_id = product_category.id
   WHERE cart_id = ?`,
      [cart_id]
    );
    // return rows[0];
    return [rows];
  }

  async readProductInCart(cartId) {
    const [rows] = await this.database.query(
      `select *
  from ${this.table} 
  WHERE cart_id = ?`,
      [cartId]
    );
    // return rows[0];
    return [rows];
  }

  async addProductInCart(quantity, size, product_id, cart_id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
     quantity,
      product_id,
      cart_id)
    VALUES (?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [quantity, product_id, cart_id]
    );
    return result;
  }

  async readTheLastProductByUser(cart_id) {
    const rows = await this.database.query(
      `select product_cart.*, product.id AS id_product, 
     product.name ,
  product.description,
  product.price,
  product.img_url,
  product.stock,
  product.category_id,
  category.name AS category_name,
  from ${this.table} INNER JOIN product ON 
  product_cart.product_id = product.id INNER JOIN category ON product.category_id = category.id
   WHERE cart_id = ? ORDER BY id DESC Limit 1`,
      [cart_id]
    );
    return rows[0];
  }

  async deleteProductInCart(cartId) {
    return this.database.query("DELETE FROM product_cart WHERE cart_id = ?", [
      cartId,
    ]);
  }
}

module.exports = ProductInCartManager;
