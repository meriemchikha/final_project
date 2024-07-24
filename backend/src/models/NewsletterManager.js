const AbstractManager = require("./AbstractManager");

class NewsletterManager extends AbstractManager {
  constructor() {
    super({ table: "newsletter" });
  }

  async getAllNewsletter() {
    const [result] = await this.database.query(`SELECT *
  FROM ${this.table} ;`);
    return [result];
  }

  async readNewsletterByUser(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [id]
    );
    // return rows[0];
    return [rows];
  }
}

module.exports = NewsletterManager;
