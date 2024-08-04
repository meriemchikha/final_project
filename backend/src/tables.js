/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const UserManager = require("./models/UserManager");
const categoryManager = require("./models/CategoryManager");
const SousCategoryManager = require("./models/SousCategoryManager");
const ProduitManager = require("./models/ProduitManager");
const CommandManager = require("./models/CommandManager");
const AvisManager = require("./models/AvisManager");
const WishlistManager = require("./models/WishlistManager");
const NewsletterManager = require("./models/NewsletterManager");
const CartManager = require("./models/CartManager");
const DetailOrderManager = require("./models/DetailOrderManager");
const ProductCartManager = require("./models/ProductCartManager");
const PaymentManager = require("./models/PaymentManager");

const managers = [
  UserManager,
  categoryManager,
  SousCategoryManager,
  ProduitManager,
  CommandManager,
  AvisManager,
  WishlistManager,
  NewsletterManager,
  CartManager,
  DetailOrderManager,
  ProductCartManager,
  PaymentManager,
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
