/* eslint-disable camelcase */

const tables = require("../tables");

const getAllProductCat = async (req, res, next) => {
  try {
    const [productCat] = await tables.category.getAll();

    res.json(productCat);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.info("id", id);
    const { name, description } = req.body;
    console.info("req.body", req.body);
    const result = await tables.category.updateProductCat(
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
    const { id } = req.params;
    const [cat] = await tables.category.getCatById(id);
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await tables.category.add(name, description);
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
    const result = await tables.category.deleteProductCat(id);
    if (result.affectedRows) {
      res.status(200).json({
        message:
          " la suppression de la catégorie du produit a été prise en compte",
      });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { getAllProductCat, update, read, add, deleteProductCat };
