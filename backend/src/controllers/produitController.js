/* eslint-disable camelcase */
const fs = require("fs");
const tables = require("../tables");

const create = async (req, res) => {
  // eslint-disable-next-line camelcase

  try {
    const { name, description, price, stock } = req.body;
    console.info("req :>>", req);
    let img_url = "";
    if (req.file) {
      img_url = req.file.path;
    }

    const result = await tables.product.create(
      name,
      description,
      price,
      stock,
      img_url
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
    const product = await tables.product.readAll();

    // Respond with the produits in JSON format
    res.json(product);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific produit from the database based on the provided ID
    const products = await tables.product.read(req.params.id);

    // If the produit is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the produit in JSON format
    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const deleteProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.product.deleteProduit(id);
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
