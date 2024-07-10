/* eslint-disable camelcase */
const fs = require("fs");
const tables = require("../tables");

const create = async (req, res) => {
  // eslint-disable-next-line camelcase

  try {
    const { name, description, price, stock } = req.body;
    console.info("req :>>", req);
    const img_url = req.file.path;

    const [result] = await tables.product.create(
      name,
      description,
      price,
      img_url,
      stock
    );
    if (result.affectedRows) {
      res.status(201).send("created");
    } else {
      fs.unlinkSync(req.file.path);
      res.status(401).send("erreur lors de l'enregistrement");
    }
  } catch (error) {
    fs.unlinkSync(req.file.path);

    res.status(500).send(error);
  }
};
// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all produits from the database
    const produits = await tables.travel.readAll();

    // Respond with the produits in JSON format
    res.json(produits);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific produit from the database based on the provided ID
    const produits = await tables.produits.read(req.params.id);

    // If the produit is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the produit in JSON format
    if (produits == null) {
      res.sendStatus(404);
    } else {
      res.json(produits);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const deleteProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.produits.deleteProduit(id);
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
module.exports = { create, browse, read, deleteProduit };
