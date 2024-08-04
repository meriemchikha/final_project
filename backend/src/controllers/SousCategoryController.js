/* eslint-disable consistent-return */
/* eslint-disable camelcase */

const tables = require("../tables");

const getAllSousCateg = async (req, res, next) => {
  try {
    const [sousCat] = await tables.sous_category.getAll();

    res.json(sousCat);
  } catch (error) {
    next(error);
  }
};
const getAllSousCategInCateg = async (req, res) => {
  try {
    // Extraire l'ID de la catégorie des paramètres de requête
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ error: "ID de catégorie requis" });
    }

    // Récupérer tous les sous categories de la base de données pour l'ID de catégorie donné
    const sousCategory = await tables.sous_category.getAllSousCategInCateg(
      categoryId
    );

    // Répondre avec les souscategory en format JSON
    res.json(sousCategory);
  } catch (err) {
    console.error("Erreur lors de la récupération des sous catégories : ", err);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des catégories.",
    });
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.info("id", id);
    const { name, description } = req.body;
    console.info("req.body", req.body);
    const result = await tables.sous_category.updateProductCat(
      id,
      name,
      description
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific produit from the database based on the provided ID
    const sousCategory = await tables.sous_category.read(req.params.id);

    // If the produit is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the produit in JSON format
    if (sousCategory == null) {
      res.sendStatus(404);
    } else {
      res.json(sousCategory);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res) => {
  try {
    const { name, description, category_id } = req.body;

    const result = await tables.sous_category.add(
      name,
      description,
      category_id
    );
    if (result.affectedRows) {
      res.status(201).send("created");
    } else {
      res.status(401).send("erreur lors de l'enregistrement");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProductCat = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tables.sous_category.deleteProductCat(id);
    if (result.affectedRows) {
      res.status(200).json({
        message:
          " la suppression de la sous catégorie du produit a été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  getAllSousCateg,
  update,
  read,
  add,
  deleteProductCat,
  getAllSousCategInCateg,
};
