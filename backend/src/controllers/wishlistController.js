/* eslint-disable camelcase */
const tables = require("../tables");

const getAllProductsInWishlist = async (req, res) => {
  try {
    const [allProductsInWishlist] =
      await tables.wishlist.getAllProductsInWishlist();
    console.info("allProductsInWishlist ", allProductsInWishlist);
    res.json(allProductsInWishlist);
  } catch (err) {
    res.status(err);
  }
};
const read = async (req, res, next) => {
  try {
    const id = req.payload;
    const [result] = await tables.wishlist.readProductByUser(id);
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
  const { quantity, product_id } = req.body;
  console.info("req.body", req.body);
  const id = req.payload;
  console.info("id", id);
  try {
    const product = await tables.wishlist.addProductInWishlist(
      quantity,
      product_id,
      id
    );
    console.info("product", product);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};
const deleteProductInWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    console.info("id", id);
    const [result] = await tables.wishlist.deleteProductInWishlist(id);
    console.info("result", result);
    if (result.affectedRows) {
      res.status(200).json({
        message:
          "La suppression du produit de la wishlist a été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllProductsInWishlist,
  read,
  add,
  deleteProductInWishlist,
};
