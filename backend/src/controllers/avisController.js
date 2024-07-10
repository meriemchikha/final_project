/* eslint-disable camelcase */
const tables = require("../tables");

const create = async (req, res) => {
  try {
    const { note, commentaire } = req.body;
    const result = await tables.Avis.create(note, commentaire);
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
    const Avis = await tables.Avis.readAll();

    // Respond with the Avis in JSON format
    res.json(Avis);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    // Fetch a specific Avis from the database based on the provided ID
    const Avis = await tables.Avis.read(req.params.id);

    // If the Avis is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Avis in JSON format
    if (Avis == null) {
      res.sendStatus(404);
    } else {
      res.json(Avis);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, commentaire } = req.body;

    const [result] = await tables.Avis.editAvis(id, note, commentaire);

    if (result.affectedRows) {
      res.status(200).json({ message: "Avis updated !" });
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
    const [result] = await tables.Avis.deleteAvis(id);
    if (result.affectedRows) {
      res.status(200).json({
        message: " Avis supprimée !",
      });
    } else {
      res.status(401).send("probleme");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { create, browse, read, edit, deleteAvis };
