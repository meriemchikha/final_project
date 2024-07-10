const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { montant } = req.body;
    const result = await tables.Paiement.create(montant);
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
    // Fetch all Paiement from the database
    const Paiement = await tables.Paiement.readAll();

    // Respond with the Paiement in JSON format
    res.json(Paiement);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific Paiement from the database based on the provided ID
    const Paiement = await tables.Paiement.read(req.params.id);

    // If the Paiement is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Paiement in JSON format
    if (Paiement == null) {
      res.sendStatus(404);
    } else {
      res.json(Paiement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
module.exports = { create, browse, read };
