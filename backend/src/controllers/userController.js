/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const tables = require("../tables");

// The A of BREAD - Add (Create) operation
// eslint-disable-next-line consistent-return
const create = async (req, res, next) => {
  // Extraire les données utilisateur du corps de la requête
  const { firstname, lastname, email, hashPassword, phone_mobile, address } =
    req.body;
  try {
    // Vérifier si l'email existe déjà dans la base de données
    const [existUser] = await tables.user.getUserByEmail(email);
    if (existUser.length > 0) {
      // Si un utilisateur avec cet email existe déjà, renvoyer une erreur
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Insérer l'utilisateur dans la base de données
    const result = await tables.user.create(
      firstname,
      lastname,
      email,
      hashPassword,
      phone_mobile,
      address
    );

    // // Envoyer l'e-mail de bienvenue
    // await sendWelcomeEmail(email);

    // Répondre avec HTTP 201 (Créé)
    if (result.affectedRows) {
      res.status(201).json("created");
    } else {
      res.status(401).json("erreur lors de l'enregistrement");
    }
  } catch (err) {
    // Passer les erreurs au middleware de gestion des erreurs
    return next(err);
  }
};

// The B of BREAD - Browse (Read All) operation
const readAll = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.getAllUser();
    console.info("users ", users);

    // Respond with the user in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.status(err);
  }
};
const update = async (req, res) => {
  try {
    const id = req.payload;
    const [result] = await tables.user.updateUserWithOutPassword(id, req.body);
    if (result.affectedRows) {
      res
        .status(200)
        .json({ message: "votre compte a été mis à jour avec succès" });
    } else {
      res.status(401).send("problème");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updatePassword = async (req, res) => {
  try {
    const { hashPassword } = req.body;
    const id = req.payload;
    const [result] = await tables.user.updateUserOnlyPassword(id, hashPassword);
    if (result.affectedRows) {
      res.status(200).json({ message: "votre demande à été pris en compte" });
    } else {
      res.status(401).send("probleme");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const readByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ status: 401, message: "remplir vos champs !" });
    } else {
      const [user] = await tables.user.getUserByEmail(email);
      if (user.length) {
        // check password
        const isVerify = await argon2.verify(user[0].hashPassword, password);

        if (typeof isVerify === "boolean" && isVerify) {
          const token = jwt.sign(
            { payload: user[0].id },
            process.env.SECRET_KEY_JWT,
            {
              expiresIn: "4h",
            }
          );

          res.status(200).json({ status: 200, token });
        } else {
          res
            .status(401)
            .json({ status: 401, message: "Vérifier vos données !" });
        }
      } else {
        res
          .status(401)
          .json({ status: 401, message: "Addresse mail n'existe pas !" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const readById = async (req, res) => {
  try {
    const id = req.payload;
    const user = await tables.user.getUserById(id);
    if (user.length) {
      res.status(200).json({ message: "isLogged", user: user[0] });
    } else {
      res.status(401).send("Erreur");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const logout = async (req, res) => {
  try {
    const id = req.payload;
    const token = jwt.sign({ payload: id }, process.env.SECRET_KEY_JWT, {
      expiresIn: "0h",
    });
    res.status(200).json({ message: "vous avez été déconnecté", token });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create,
  readAll,
  update,
  updatePassword,
  readByEmail,
  readById,
  logout,
};
