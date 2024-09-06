/* eslint-disable camelcase */
const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { payment, statut, user_id, cart_id, payment_id } = req.body;
    const result = await tables.command.create(
      payment,
      statut,
      user_id,
      cart_id,
      payment_id
    );
    console.info(result.affectedRows);
    if (result.affectedRows) {
      res.status(201).json("created");
    } else {
      res.status(401).json("erreur lors de l'enregistrement");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const browse = async (req, res, next) => {
  try {
    // Fetch all commandes from the database
    const commandes = await tables.command.readAll();

    // Respond with the bookings in JSON format
    res.json(commandes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    const userId = req.payload;
    const { id } = req.params;
    // Fetch a specific commandes from the database based on the provided ID
    const commandes = await tables.command.read(userId, id);

    // If the commandes is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the commandes in JSON format
    if (commandes == null) {
      res.sendStatus(404);
    } else {
      res.json(commandes);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const getAllCommandByUser = async (req, res) => {
  try {
    const id = req.payload;
    const [commandsByUser] = await tables.command.getAllCommandByUser(id);
    res.status(200).json(commandsByUser);
  } catch (err) {
    res.status(err);
  }
};
module.exports = { create, browse, read, getAllCommandByUser };
