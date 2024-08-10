const express = require("express");
const hashPassword = require("./services/hashPassword");
const userController = require("./controllers/userController");
const produitController = require("./controllers/produitController");
const commandController = require("./controllers/commandController");
const avisController = require("./controllers/avisController");
// const paymentController = require("./controllers/paymentController");
const wishlistController = require("./controllers/wishlistController");
const cartController = require("./controllers/cartController");
const categoryController = require("./controllers/categoryController");
const SousCategoryController = require("./controllers/SousCategoryController");
const newsletterController = require("./controllers/newsletterController");
const productCartController = require("./controllers/productCartController");

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
router.get("/users/:id", userController.readById);
router.patch("/users/:id", verifyToken, userController.update);
router.patch(
  "/users/:id/edit-password",
  verifyToken,
  hashEditPassword,
  userController.updatePassword
);

// Routes Categories
router.post("/category", categoryController.add);
router.get("/category", categoryController.getAllProductCat);
router.get("/category/:id", categoryController.read);
router.delete("/category/:id", categoryController.deleteCateg);
router.put("/category", categoryController.update);

// Routes sous-Categories
router.post("/sous-category", SousCategoryController.add);
router.get("/sous-category", SousCategoryController.getAllSousCateg);
// Route pour récupérer une sous-catégorie spécifique par ID
router.get("/sous-category/:id", SousCategoryController.read);
router.delete("/sous-category/:id", SousCategoryController.deleteProductCat);
router.put("/sous-category", SousCategoryController.update);
// Route pour récupérer les sous-catégories d'une catégorie
router.get(
  "/sous-category/category/:categoryId",
  SousCategoryController.getAllSousCategInCateg
);

// Routes Produits
router.post("/product", upLoad, produitController.create);
router.get("/product", produitController.browse);
router.get("/product/:id", produitController.read);
router.delete("/product/:id", produitController.deleteProduit);
router.get("/All-Product", produitController.getAllProductInSousCategory); // http://localhost:3310/api/All-Product?sousCategoryId=2 dans thunder client
router.patch(
  "/product/:id/update-picture",
  upLoad,
  produitController.editOnlyPicture
);
router.get("/product/:id/comments", produitController.getAllCommentsByProduct);
// Routes ProductInCart
router.get("/all-product-cart", productCartController.getAllProductsInCart);
router.get("/product-in-cart/:cart_id", productCartController.read);
router.post("/product-in-cart", productCartController.add);
router.delete(
  "/product/:product_id/:cart_id",
  productCartController.deleteProductInCart
);

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
// router.post("/create-order", paymentController.create);
// router.get("/payment", paymentController.browse);
// router.get("/payment/:id", paymentController.read);

// Route Panier
router.get("/all-cart", verifyToken, cartController.browse);
router.post("/cart", verifyToken, cartController.addCart);

// Routes Wishlist
// router.get("/wishlist", wishlistController.getAllProductsInWishlist);
router.get(
  "/all-productsInWishlist",
  verifyToken,
  wishlistController.getAllProductsInWishlist
);
router.get("/wishlist/:user_id", verifyToken, wishlistController.read);
router.post("/wishlist", verifyToken, wishlistController.add);
router.delete(
  "/wishlist/:product_id",
  wishlistController.deleteProductInWishlist
);

// Route newsletter
router.get("/all-newsletter", newsletterController.getAllNewsletter);
router.get("/newsletter/:id", newsletterController.read);

/* ************************************************************************* */

module.exports = router;
