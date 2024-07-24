const express = require("express");
const hashPassword = require("./services/hashPassword");
const userController = require("./controllers/userController");
const produitController = require("./controllers/produitController");
const commandController = require("./controllers/commandController");
const avisController = require("./controllers/avisController");
const paymentController = require("./controllers/paymentController");
const wishlistController = require("./controllers/wishlistController");
const cartController = require("./controllers/cartController");
const categoryController = require("./controllers/categoryController");
const newsletterController = require("./controllers/newsletterController");

const upLoad = require("./services/upLoad");
const hashEditPassword = require("./services/hashEditPassword");
const verifyToken = require("./services/verifyToken");

// const upLoad = require("./services/upLoad");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Route d'auth
router.post("/login", userController.readByEmail);
router.get("/profile", verifyToken, userController.readById);
router.post("/logout", verifyToken, userController.logout);

// Routes user
router.post("/users", hashPassword, userController.create);
router.get("/users", userController.readAll);
// router.get("/users/:id", userController.readById);
router.patch("/users/:id", verifyToken, userController.update);
router.patch(
  "/users/:id/edit-password",
  verifyToken,
  hashEditPassword,
  userController.updatePassword
);

// Routes Categories
router.post("/category", upLoad, categoryController.add);
router.get("/category", categoryController.getAllProductCat);
router.get("/category/:id", categoryController.read);
router.delete("/category/:id", categoryController.deleteProductCat);
router.put("/category", categoryController.update);

// Routes Produits
router.post("/product", upLoad, produitController.create);
router.get("/product", produitController.browse);
router.get("/product/:id", produitController.read);
router.delete("/product/:id", produitController.deleteProduit);

// Routes Commandes
router.post("/command", commandController.create);
router.get("/command", commandController.browse);
router.get("/command/:id", commandController.read);

// Routes Avis
router.post("/comment", avisController.create);
router.get("/comment", avisController.browse);
router.get("/comment/:id", avisController.read);
router.put("/comment/:id", avisController.edit);
router.delete("/comment/:id", avisController.deleteAvis);

// Routes Paiement
router.post("/pay", paymentController.create);
router.get("/payment", paymentController.browse);
router.get("/payment/:id", paymentController.read);

// Route Panier
router.get("/all-cart", cartController.browse);
router.post("/cart", cartController.addCart);

// Routes Wishlist
router.get("/wishlist", wishlistController.getAllProductsInWishlist);
router.get("/wishlist/:id", wishlistController.read);
router.get("/wishlist/:id", verifyToken, wishlistController.read);
router.post("/wishlist", verifyToken, wishlistController.add);
router.delete("/wishlist/:id", wishlistController.deleteProductInWishlist);

// Route newsletter
router.get("/all-newsletter", newsletterController.getAllNewsletter);
router.get("/newsletter/:id", newsletterController.read);

/* ************************************************************************* */

module.exports = router;
