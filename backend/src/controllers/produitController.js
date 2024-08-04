/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const fs = require("fs");
const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { name, description, price, stock, sous_category_id } = req.body;

    // Validation des champs requis
    if (!name || !description || !price || !stock || !sous_category_id) {
      return res.status(400).send("Tous les champs sont requis.");
    }

    // Vérification si le fichier est présent
    if (!req.file || !req.file.path) {
      return res.status(400).send("L'image est requise.");
    }

    const img_url = req.file.path;

    const result = await tables.product.create(
      name,
      description,
      price,
      stock,
      img_url,
      sous_category_id
    );

    if (result.affectedRows) {
      res.status(201).send("created");
    } else {
      fs.unlinkSync(req.file.path);
      res.status(401).send("Erreur lors de l'enregistrement");
    }
  } catch (error) {
    // Suppression du fichier en cas d'erreur
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send(error.message);
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
    const { id } = req.params;
    // Fetch a specific produit from the database based on the provided ID
    const products = await tables.product.read(id);

    // If the produit is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the produit in JSON format
    if (products == null) {
      res.sendStatus(404);
    } else {
      res.json(products);
    }
    console.info("product======>", products);
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

const editOnlyPicture = async (req, res) => {
  try {
    const id = req.payload;

    const img_url = req.file.path;

    const [product] = await tables.product.read(id);

    if (product.length) {
      await tables.product.editPicture(img_url);
      res.json("Image mise à jour avec succès");
    } else {
      fs.unlinkSync(req.file.path);

      res.status(401).json("verifier vos données");
    }
  } catch (error) {
    // fs.unlinkSync(req.file.path);
    res.status(500).json(error);
  }
};

const getAllProductInSousCategory = async (req, res) => {
  try {
    // Extraire l'ID de la sous-catégorie des paramètres de requête
    const { sousCategoryId } = req.query;

    if (!sousCategoryId) {
      return res.status(400).json({ error: "ID de sous-catégorie requis" });
    }

    // Récupérer tous les produits de la base de données pour l'ID de sous-catégorie donné
    const products = await tables.product.getAllProductInSousCategory(
      sousCategoryId
    );

    // Répondre avec les produits en format JSON
    res.json(products);
  } catch (err) {
    console.error("Erreur lors de la récupération des produits : ", err);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};

module.exports = {
  create,
  browse,
  read,
  deleteProduit,
  editOnlyPicture,
  getAllProductInSousCategory,
};
