const AbstractManager = require("./AbstractManager");

class WishlistManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Wishlist" as configuration
    super({ table: "Wishlist" });
  }

  async getAllProductsInWishlist() {
    // Execute the SQL SELECT query to retrieve all Wishlist from the "Wishlist" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async readProductByUser(id) {
    const [rows] = await this.database.query(
      `select wishlist.*, product.id AS id_product, 
     product.name ,
  product.description,
  product.price,
  product.stock,
  product.category_id,
  product.sous_category_id,
   from ${this.table} JOIN product ON wishlist.product_id = product.id where user_id = ?`,
      [id]
    );
    // return rows[0];
    return [rows];
  }

  // eslint-disable-next-line camelcase
  async addProductInWishlist(quantity, product_id, id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (
      quantity,
      product_id,
      user_id)
    VALUES (?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [quantity, product_id, id]
    );
    return result;
  }

  async deleteProductInWishlist(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}
module.exports = WishlistManager;
