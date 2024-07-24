/* eslint-disable camelcase */
const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { firstname, comment, note } = req.body;
    const result = await tables.avis.create(firstname, comment, note);
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
    // Fetch all Avis from the database
    const avis = await tables.avis.readAll();

    // Respond with the Avis in JSON format
    res.json(avis);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific Avis from the database based on the provided ID
    const avis = await tables.avis.read(req.params.id);

    // If the Avis is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Avis in JSON format
    if (avis == null) {
      res.sendStatus(404);
    } else {
      res.json(avis);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, comment, note } = req.body;

    const [result] = await tables.avis.editAvis(id, firstname, comment, note);

    if (result.affectedRows) {
      res.status(200).json({ message: "Comment updated !" });
    } else {
      res.status(401).json("probleme");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteAvis = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await tables.avis.deleteAvis(id);
    if (result.affectedRows) {
      res.status(200).json({
        message: " Comment supprimée !",
      });
    } else {
      res.status(401).send("probleme");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { create, browse, read, edit, deleteAvis };
