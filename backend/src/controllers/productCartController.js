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
    const [result] = await tables.product_cart.readProductByUser(cart_id);
    if (result == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

const readTheLast = async (req, res, next) => {
  try {
    const { cart_id } = req.params;
    // id transmis en paramètre doit correspondre au panier en cours de l'utilisateur
    const [result] = await tables.product_cart.readTheLastProductByUser(
      cart_id
    );
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
  const { quantity, size, product_id, cart_id } = req.body;
  try {
    const product = await tables.product_cart.addProductInCart(
      quantity,
      size,
      product_id,
      cart_id
    );
    console.info("product", product);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProductsInCart,
  read,
  readTheLast,
  add,
};
