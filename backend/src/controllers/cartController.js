/* eslint-disable consistent-return */
const tables = require("../tables");

const addCart = async (req, res, next) => {
  const { userId } = req.body;

  console.info("Received userId in request body:", userId);

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" }); // Réponse appropriée pour une requête invalide
    }

    const cart = await tables.cart.addCart(userId); // Utilise la méthode du manager
    console.info("New cart entry:", cart);

    res.status(201).json({ cart }); // Réponse JSON avec les données du panier ajoutées
  } catch (err) {
    console.error("Error adding to cart:", err);

    res.status(500).json({ error: `Internal Server Error: ${err.message}` });
    next(err);
  }
};

const getCartByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [cartByUser] = await tables.cart.getCartByUser(id);
    res.status(200).json(cartByUser);
  } catch (err) {
    res.status(err);
  }
};
const browse = async (req, res, next) => {
  try {
    // Fetch all cart from the database
    const panier = await tables.cart.readAll();

    // Respond with the cart in JSON format
    res.json(panier);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
module.exports = { browse, addCart, getCartByUser };
