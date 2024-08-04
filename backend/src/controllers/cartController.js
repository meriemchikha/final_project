const tables = require("../tables");

const addCart = async (req, res, next) => {
  const id = req.body.userId;
  console.info("req.body", id);
  try {
    if (!id) {
      throw new Error("User ID is required");
    }

    const cart = await tables.cart.addCart(id);
    console.info("cart", cart);
    res.status(201).json({ cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: err.message }); // Envoyer un message d'erreur détaillé
    next(err);
  }
};

const browse = async (req, res, next) => {
  try {
    // Fetch all Avis from the database
    const panier = await tables.cart.readAll();

    // Respond with the Avis in JSON format
    res.json(panier);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
module.exports = { browse, addCart };
