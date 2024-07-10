const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { nom, description } = req.body;
    const result = await tables.catégories.create(nom, description);
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
    // Fetch all categories from the database
    const catégories = await tables.catégories.readAll();

    // Respond with the bookings in JSON format
    res.json(catégories);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific categories from the database based on the provided ID
    const catégories = await tables.catégories.read(req.params.id);

    // If the categories is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the categories in JSON format
    if (catégories == null) {
      res.sendStatus(404);
    } else {
      res.json(catégories);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const deleteCatg = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.catégories.deleteCatg(id);
    if (result.affectedRows) {
      res.status(200).json({
        message: " Catégories supprimée !",
      });
    } else {
      res.status(401).send("probleme");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { create, browse, read, deleteCatg };
