/* eslint-disable camelcase */
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    // Fetch all Wishlist from the database
    const Wishlist = await tables.Wishlist.readAll();

    // Respond with the Wishlist in JSON format
    res.json(Wishlist);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific Wishlist from the database based on the provided ID
    const Wishlist = await tables.Wishlist.read(req.params.id);

    // If the Wishlist is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Wishlist in JSON format
    if (Wishlist == null) {
      res.sendStatus(404);
    } else {
      res.json(Wishlist);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = { browse, read };
