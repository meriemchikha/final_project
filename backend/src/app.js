/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const paypal = require("@paypal/checkout-server-sdk");

// Import des routes API depuis le module router
const router = require("./router");
const tables = require("./tables");

const app = express();

// Configuration CORS
// Définir les origines autorisées pour les requêtes CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // Assurez-vous que cette variable est définie dans votre fichier .env
      "http://mysite.com",
      "http://another-domain.com",
    ],
  })
);

// Parsing des requêtes
app.use(express.json()); // Pour les requêtes avec des données JSON
app.use(bodyParser.json()); // Pour les requêtes avec des données JSON
app.use("/uploads", express.static("uploads"));
// Montre les routes API sous le point de terminaison "/api"
app.use("/api", router);

// Configuration de PayPal
const environment = new paypal.core.SandboxEnvironment(
  "ASMbz4aZmdtW2N1u0rTFROXnP_-RmZJtQHVFPSGO6QAVCRd5oqGuSe9vZ7Gp4WSCBoHoDbOLBInF0w0c",
  "EOrSvrDYGJm9KY71WQSQvPRfyTP0yFGdun_QnRQLuToMKfxIF8AIKcA3tmYPlGxkwt57OzNx2f9yZzi9"
);
const client = new paypal.core.PayPalHttpClient(environment);

// Route pour créer une commande PayPal
app.post("/create-order", async (req, res) => {
  const { cart_id, cartItems } = req.body;

  if (!cart_id || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: "Données manquantes ou invalides" });
  }

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: totalAmount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    const payment_id = order.result.id;

    console.info(`Payment ID: ${payment_id}, Total Amount: ${totalAmount}`);

    try {
      const result = await tables.payment.create(payment_id, totalAmount);
      console.info("Result from database insert:", result);
      res.json({ payment_id, cart_id });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du paiement:",
        error.message
      );
      res
        .status(500)
        .json({ error: "Erreur lors de l'enregistrement du paiement" });
    }
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande" });
  }
});

// eslint-disable-next-line consistent-return
app.post("/save-command", async (req, res) => {
  const { payment, statut, user_id, cart_id, payment_id } = req.body;

  if (!payment || !statut || !user_id || !cart_id || !payment_id) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  console.info(
    `Données reçues pour l'enregistrement : ${JSON.stringify(req.body)}`
  );

  try {
    const result = await tables.command.create(
      payment,
      statut,
      user_id,
      cart_id,
      payment_id
    );
    console.info("Résultat de l'insertion :", result);
    res.status(201).json({ message: "Commande enregistrée avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de l'enregistrement de la commande:",
      error.message
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Configuration pour un environnement de production (désactivé par défaut)
// Décommentez cette section lorsque vous êtes prêt à déployer en production.
/*
const reactBuildPath = `${__dirname}/../../frontend/dist`;
app.use(express.static(reactBuildPath));
app.get("*", (req, res) => {
  res.sendFile(`${reactBuildPath}/index.html`);
});
*/

// Middleware pour la gestion des erreurs (désactivé par défaut)
// Décommentez cette section pour activer la journalisation des erreurs.
/*
const logErrors = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);
*/

// Exportation de l'application pour l'utiliser ailleurs
module.exports = app;
