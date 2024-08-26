/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const tables = require("../tables");

const getAllProductsInCart = async (req, res) => {
  try {
    const [allProductsInCart] =
      await tables.product_cart.getAllProductsInCart();
    console.info("allProductsInCart ", allProductsInCart);
    res.json(allProductsInCart);
  } catch (err) {
    res.status(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    // id transmis en paramètre doit correspondre au panier en cours de l'utilisateur
    const [result] = await tables.product_cart.readProductInCart(cart_id);
    if (result == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { quantity, product_id, cart_id } = req.body;
  try {
    const product = await tables.product_cart.addProductInCart(
      quantity,
      product_id,
      cart_id
    );
    console.info("product", product);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};
const deleteProductInCart = async (req, res) => {
  try {
    // const { cart_id } = req.params;
    const { product_id } = req.params;
    const [result] = await tables.product_cart.deleteProductInCart(
      // cart_id,
      product_id
    );
    if (result.affectedRows) {
      res.status(200).json({
        message: " Produit supprimée !",
      });
    } else {
      res.status(401).send("probleme");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const edit = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id, cart_id } = req.params; // Retrieve id from route parameters

    // Ensure both quantity and id are provided
    if (!quantity || !id || !cart_id) {
      return res.status(400).json({ message: "Missing quantity or id" });
    }
    // Call the method with both parameters
    const [result] = await tables.product_cart.editQuantity(
      id,
      quantity,
      cart_id
    );

    if (result.affectedRows) {
      res.status(200).json({ message: "Quantity updated!" });
    } else {
      res.status(404).json({ message: "Product not found or no change" });
    }
  } catch (error) {
    console.error("Error updating quantity:", error); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  getAllProductsInCart,
  read,
  add,
  deleteProductInCart,
  edit,
};
