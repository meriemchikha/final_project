const tables = require("../tables");

const getAllNewsletter = async (req, res) => {
  try {
    const [allNewsletter] = await tables.newsletter.getAllNewsletter();
    console.info("allNewsletter ", allNewsletter);
    res.json(allNewsletter);
  } catch (err) {
    res.status(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await tables.newsletter.readNewsletterByUser(id);
    if (result == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line no-undef
module.exports = { getAllNewsletter, read };
