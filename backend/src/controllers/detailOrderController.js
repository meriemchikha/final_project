/* eslint-disable camelcase */
const tables = require("../tables");

const getDetailOrder = async (req, res) => {
  try {
    const [infos] = await tables.detail_order.getInfo();
    res.json(infos);
  } catch (error) {
    res.status(error);
  }
};

const addProductInDetailOrder = async (req, res) => {
  const { cart_id, command_id } = req.body;
  const cartId = cart_id;
  const commandId = command_id;

  console.info("cartId", cartId);

  try {
    const [products] = await tables.product_cart.readProductInCart(cartId);
    console.info("products", products);

    await tables.detail_order.insertCommandDetails(commandId, products);

    await tables.product_cart.deleteProductInCart(cartId);

    res
      .status(200)
      .json({ message: "Paiement validé et produits commandés avec succès !" });
  } catch (error) {
    res.status(error);
  }
};
module.exports = {
  getDetailOrder,
  addProductInDetailOrder,
};
