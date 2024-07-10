const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  console.info(req.body);
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };
  try {
    const { password } = req.body;

    if (password) {
      const hashedPassword = await argon2.hash(password, hashOptions);
      delete req.body.password;

      req.body.hashPassword = hashedPassword;

      next();
    } else {
      res.status(401).json("Vérifier vos données (hashPassword middleware)");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = hashPassword;
