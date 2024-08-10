/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const tables = require("../tables");

const getAllProductsInWishlist = async (req, res) => {
  try {
    // eslint-disable-next-line no-undef

    const allProductsInWishlist =
      await tables.wishlist.getAllProductsInWishlist();

    console.info("allProductsInWishlist ", allProductsInWishlist);
    res.json(allProductsInWishlist);
  } catch (err) {
    console.error("Error fetching products in wishlist: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const read = async (req, res, next) => {
  try {
    const user_id = req.payload; // Le user_id est récupéré depuis le payload du token
    const [result] = await tables.wishlist.readProductByUser(user_id);
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun produit dans la wishlist" });
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const add = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.payload;

    if (!product_id || !user_id) {
      return res
        .status(400)
        .send({ error: "Product ID and User ID are required." });
    }

    console.info("req.body", req.body);
    console.info("user_id", user_id);

    const productInWishlist = await tables.wishlist.addProductInWishlist(
      product_id,
      user_id
    );
    console.info("Product added to wishlist:", productInWishlist);

    res.status(201).json({ productInWishlist });
  } catch (err) {
    console.error("Error in adding product to wishlist:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteProductInWishlist = async (req, res) => {
  try {
    const { product_id } = req.params;
    console.info("id de produit in wishlist", product_id);
    const [result] = await tables.wishlist.deleteProductInWishlist(product_id);
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
