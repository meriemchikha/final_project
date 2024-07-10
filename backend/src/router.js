const express = require("express");
const hashPassword = require("./services/hashPassword");
const userController = require("./controllers/userController");
const produitController = require("./controllers/produitController");
const commandeController = require("./controllers/commandeController");
const avisController = require("./controllers/avisController");
const paiementController = require("./controllers/paiementController");
const wishlistController = require("./controllers/wishlistController");

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
// router.post("/categories", categoriesController.create);
// router.get("/categories", categoriesController.browse);
// router.get("/categories/:id", categoriesController.read);
// router.delete("/categories/:id", categoriesController.deleteCatg);

// Routes Produits
router.post("/product", upLoad, produitController.create);
router.get("/product", produitController.browse);
router.get("/product/:id", produitController.read);
// router.delete("/produit/:id", produitController.deleteProduit);

// Routes Commandes
router.post("/commande", commandeController.create);
router.get("/commande", commandeController.browse);
router.get("/commande/:id", commandeController.read);

// Routes Avis
router.post("/avis", avisController.create);
router.get("/avis", avisController.browse);
router.get("/avis/:id", avisController.read);
router.put("/avis/:id", avisController.edit);
router.delete("/avis/:id", avisController.deleteAvis);

// Routes Paiement
router.post("/pay", paiementController.create);
router.get("/paiement", paiementController.browse);
router.get("/paiement/:id", paiementController.read);

// Route Panier

// Routes Wishlist
// router.get("/wishlist/user/user_id");
router.get("/wishlist", wishlistController.browse);
router.delete("/wishlist/:id", wishlistController.read);

/* ************************************************************************* */

module.exports = router;
