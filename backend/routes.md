| route           | Verbe  | Front | Back | Description                                               | status |
| --------------- | ------ | ----- | ---- | --------------------------------------------------------- | ------ |
| /               | /      | oui   | non  | consulter la page d'accueil                               |        |
| /inscription    | /      | oui   | non  | accéder à la page d'inscription                           |        |
| /profile        | /      | oui   | non  | accéder à mes informations                                |        |
| /products       | /      | oui   | non  | accéder à tous les produits                               |
| /products /id   | /      | oui   | non  | afficher les détails de produit                           |
| /paiement       | /      | oui   | non  | accéder à la page de paiement                             |
| /panier         | /      | oui   | non  | accéder à la page des commande (panier)                   |
| /users          | post   | non   | oui  | enregistrer un user                                       |        |
| /login          | post   | non   | oui  | connecter un user                                         |        |
| /profile        | get    | non   | oui  | accéder au information de user connecté                   |        |
| /categories     | post   | non   | oui  | ajouter une nouvelle categories                           |        |
| /categories     | get    | non   | oui  | afficher les catégories disponibles sur le site           |        |
| /categories/:id | get    | non   | oui  | afficher les détails du catégorie disponibles sur le site |        |
| /categories/:id | delete | non   | oui  | supprimer une catégorie disponibles sur le site           |        |
| /produit        | post   | non   | oui  | ajouter un produit à une catégories                       |        |
| /produit        | get    | non   | oui  | afficher tous les produits disponibles                    |        |
| /produit/:id    | get    | non   | oui  | afficher les détails d'un produit                         |        |
| /commande       | post   | non   | oui  | ajouter une commande                                      |        |
| /commande       | get    | non   | oui  | accéder à tous les commandes (panier)                     |        |
| /commande/:id   | get    | non   | oui  | accéder au details d'une commande                         |        |
| /paiment        | post   | non   | oui  | faire un paiement                                         |        |
| /paiment        | get    | non   | oui  | accéder à tous les paiements                              |        |
| /paiment/:id    | get    | non   | oui  | accéder à un paiement par son id                          |        |
| /avis           | post   | non   | oui  | poster un avis sur un produit                             |        |
| /avis           | get    | non   | oui  | afficher tous les avis sur un produit                     |        |
| /avis/:id       | get    | non   | oui  | afficher un avis d'un user sur un produit                 |        |
| /avis/:id       | put    | non   | oui  | modifier un avis sur un produit                           |        |
| /avis/:id       | delete | non   | oui  | supprimer un avis sur un produit                          |        |
