/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WishlistManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Wishlist" as configuration
    super({ table: "wishlist" });
  }

  async getAllProductsInWishlist() {
    // Exécutez la requête SQL SELECT pour récupérer tous les produits de la table "wishlist"
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Retournez le tableau de produits
    return rows;
  }

  async readProductByUser(id) {
    try {
      const [rows] = await this.database.query(
        `SELECT 
        p.id AS product_id,
        p.name AS product_name,
        p.price AS product_price,
        p.img_url AS product_img_url
      FROM 
        wishlist w
      JOIN 
        product p ON w.product_id = p.id
      WHERE 
        w.user_id = ?`, // Assurez-vous que la colonne user_id est utilisée correctement
        [id]
      );
      return rows;
    } catch (error) {
      console.error("Error in readProductByUser:", error.message);
      throw error;
    }
  }

  // eslint-disable-next-line camelcase
  async addProductInWishlist(product_id, user_id) {
    try {
      // Vérifiez d'abord si le produit est déjà dans la wishlist
      const [existingProduct] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE product_id = ? AND user_id = ?`,
        [product_id, user_id]
      );

      if (existingProduct.length > 0) {
        console.info("Le produit est déjà dans la wishlist.");
        return existingProduct[0]; // Retourner l'entrée existante
      }

      // Ajoutez le produit à la wishlist
      const [result] = await this.database.query(
        `INSERT INTO ${this.table} (product_id, user_id) VALUES (?, ?)`,
        [product_id, user_id]
      );

      console.info("Query Result:", result);

      // Récupérer le produit ajouté pour le renvoyer
      const [addedProduct] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE id = ?`,
        [result.insertId]
      );

      return addedProduct[0];
    } catch (error) {
      console.error("Error in addProductInWishlist:", error.message);
      throw error;
    }
  }

  async deleteProductInWishlist(product_id) {
    return this.database.query(
      `delete from ${this.table} where product_id = ?`,
      [product_id]
    );
  }
}
module.exports = WishlistManager;
