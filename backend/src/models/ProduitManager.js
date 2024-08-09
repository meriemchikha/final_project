/* eslint-disable camelcase */
/* eslint-disable no-undef */
const AbstractManager = require("./AbstractManager");

class ProduitManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "produits" as configuration
    super({ table: "product" });
  }

  // eslint-disable-next-line camelcase
  async create(name, description, price, stock, img_url, sous_category_id) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, description, price, stock, img_url, sous_category_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, stock, img_url, sous_category_id]
    );
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all produits from the "produits" table
    const [rows] = await this.database.query(`select *from ${this.table}`);

    // Return the array of users
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific produit by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the produits
    return rows[0];
  }

  async deleteProduit(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  async getAllProductInSousCategory(sousCategoryId) {
    const [result] = await this.database.query(
      `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.description AS product_description,
      p.price,
      p.stock,
      p.img_url,
      p.created_at,
      p.modified_at,
      sc.id AS sous_category_id,
      sc.name AS sous_category_name,
      sc.description AS sous_category_description
    FROM
      product p
    JOIN
      sous_category sc ON p.sous_category_id = sc.id
    WHERE 
      sc.id = ?`,
      [sousCategoryId]
    );
    return result;
  }

  editPicture(img_url) {
    return this.database.query(
      `UPDATE ${this.table} SET img_url = ?`,
      // eslint-disable-next-line camelcase
      [img_url]
    );
  }

  getAllCommentsByProduct(id) {
    return this.database.query(
      `SELECT 
          p.id AS productId, 
          p.name AS productName, 
          a.id AS avisId,  
          a.comment AS avisComment,
          u.firstname AS firstnameUser,
          DATE_FORMAT(a.created_at, '%d/%m/%Y à %H:%i:%s') AS avisDate 
      FROM 
          product AS p 
      LEFT JOIN 
          avis AS a
      ON 
          p.id = a.product_id 
      LEFT JOIN 
          user AS u
      ON 
          a.user_id = u.id
      WHERE 
          p.id = ?;`,
      [id]
    );
  }
}
module.exports = ProduitManager;
