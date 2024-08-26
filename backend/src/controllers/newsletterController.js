/* eslint-disable consistent-return */
const tables = require("../tables");

const add = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const news = await tables.newsletter.addNewsletter(email);
    console.info("Inserted email:", news);
    res.status(201).json({ news });
  } catch (err) {
    console.error("Error inserting email:", err);
    next(err);
  }
};

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
module.exports = { add, getAllNewsletter, read };
