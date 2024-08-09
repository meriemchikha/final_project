DROP DATABASE IF EXISTS shopping_db;

CREATE DATABASE shopping_db;

USE shopping_db;

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  hashPassword VARCHAR(255) NOT NULL,
  phone_mobile VARCHAR(15) NOT NULL,
  address VARCHAR(150) NOT NULL,
  isMember BOOLEAN DEFAULT 0,
  isAdmin BOOLEAN DEFAULT 0 
);

CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(150) NOT NULL 
);

INSERT INTO category (name, description) VALUES
('Soins de la peau', 'Produits pour nettoyer, hydrater et protéger la peau.'),
('Maquillage', 'Produits pour embellir et accentuer les traits du visage.'),
('Soins des cheveux', 'Produits pour laver, conditionner et coiffer les cheveux.'),
('Parfums', 'Parfums et eaux de toilette pour hommes et femmes.'),
('Soins du corps', 'Produits pour hydrater, exfolier et protéger la peau du corps.'),
('Accessoires de beauté', 'Outils et accessoires pour l application de produits de beauté.'),
('Soins des ongles', 'Produits pour soigner et embellir les ongles.');

CREATE TABLE sous_category (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(150) NOT NULL,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO sous_category (name, description, category_id) VALUES
('Nettoyants pour le visage', 'Produits pour nettoyer en profondeur la peau du visage.', 1),
('Hydratants pour le visage', 'Crèmes et lotions pour hydrater la peau du visage.', 1),
('Sérums', 'Concentrés de soins pour traiter des problèmes spécifiques de la peau.', 1),
('Masques pour le visage', 'Masques pour nourrir, hydrater et revitaliser la peau.', 1),
 ('Anti-âge', 'Produits pour lutter contre les signes de vieillissement de la peau.', 1),
('Soins des lèvres', 'Baumes et soins pour hydrater et protéger les lèvres.', 1),
('Soins du contour des yeux', 'Crèmes et gels pour la zone délicate autour des yeux.', 1),
 ('Crèmes solaires', 'Produits pour protéger la peau des rayons UV du soleil.', 1);

INSERT INTO sous_category (name, description, category_id) VALUES
('Fond de teint', 'Produits pour uniformiser le teint du visage.', 2),
('Correcteurs et anti-cernes', 'Produits pour masquer les imperfections et les cernes.', 2),
('Poudres', 'Produits pour fixer le maquillage et matifier la peau.', 2),
('Blush', 'Produits pour ajouter une touche de couleur aux joues.', 2),
 ('Fards à paupières', 'Produits pour maquiller et embellir les yeux.', 2),
('Eyeliners', 'Produits pour souligner et définir le contour des yeux.', 2),
('Mascara', 'Produits pour allonger, épaissir et définir les cils.', 2),
('Rouges à lèvres', 'Produits pour colorer et hydrater les lèvres.', 2),
('Gloss et baumes à lèvres', 'Produits pour ajouter de la brillance et de l hydratation aux lèvres.', 2);

INSERT INTO sous_category (name, description, category_id) VALUES
('Shampooings', 'Produits pour nettoyer et rafraîchir les cheveux.', 3),
('Après-shampooings', 'Produits pour hydrater et démêler les cheveux.', 3),
('Masques capillaires', 'Produits pour nourrir et réparer les cheveux en profondeur.', 3),
('Huiles capillaires', 'Huiles pour hydrater et protéger les cheveux.', 3),
('Sérums capillaires', 'Sérums pour traiter les problèmes spécifiques des cheveux.', 3),
 ('Gels et cires', 'Produits pour sculpter et définir les coiffures.', 3),
 ('Colorations capillaires', 'Produits pour colorer et teindre les cheveux.', 3);

INSERT INTO sous_category (name, description, category_id) VALUES
('Parfums pour femmes', 'Fragrances créées spécifiquement pour les femmes.', 4),
('Parfums pour hommes', 'Fragrances créées spécifiquement pour les hommes.', 4),
('Parfums unisexes', 'Fragrances conçues pour être portées par tous les genres.', 4),
('Brumes corporelles', 'Fragrances légères et rafraîchissantes pour le corps.', 4),
('Huiles parfumées', 'Concentrés de parfums sous forme d huile.', 4),
('Coffrets cadeaux', 'Ensembles de parfums souvent accompagnés de produits assortis.', 4),
('Miniatures', 'Petites versions des parfums pour tester ou voyager.', 4);

INSERT INTO sous_category (name, description, category_id) VALUES
('Hydratants pour le corps', 'Lotions et crèmes pour hydrater la peau du corps.', 5),
 ('Huiles pour le corps', 'Huiles nourrissantes pour hydrater et adoucir la peau.', 5),
('Crèmes pour les mains', 'Crèmes spécialement formulées pour hydrater et protéger les mains.', 5),
('Soins pour les pieds', 'Produits pour soigner et rafraîchir les pieds.', 5),
('Gels douche', 'Produits nettoyants pour la douche.', 5),
('Savons', 'Savons solides et liquides pour nettoyer la peau.', 5),
 ('Déodorants et antitranspirants', 'Produits pour contrôler la transpiration et les odeurs corporelles.', 5);

INSERT INTO sous_category (name, description, category_id) VALUES
('Pinceaux de maquillage', 'Pinceaux pour appliquer le maquillage avec précision.', 6),
('Eponges de maquillage', 'Eponges pour appliquer et estomper le maquillage.', 6),
 ('Recourbe-cils', 'Outils pour courber et définir les cils.', 6),
('Brosses à cheveux', 'Brosses pour démêler et coiffer les cheveux.', 6),
('Peignes', 'Peignes pour démêler et styliser les cheveux.', 6),
 ('Trousse de maquillage', 'Trousses pour organiser et transporter le maquillage.', 6),
('Miroirs de poche', 'Petits miroirs portables pour retouches rapides.', 6);

INSERT INTO sous_category (name, description, category_id) VALUES
('Vernis à ongles', 'Produits pour colorer et embellir les ongles.', 7),
('Base coat', 'Sous-couches pour protéger les ongles et prolonger la tenue du vernis.', 7),
 ('Dissolvants', 'Produits pour enlever le vernis à ongles.', 7),
('Huiles pour cuticules', 'Huiles pour hydrater et nourrir les cuticules.', 7),
('Crèmes pour les mains et ongles', 'Crèmes hydratantes spécialement formulées pour les mains et les ongles.', 7),
('Limes à ongles', 'Outils pour limer et façonner les ongles.', 7),
('Pinceaux à ongles', 'Pinceaux pour appliquer le vernis et réaliser des nail art.', 7),
('Kits de manucure', 'Ensembles complets pour réaliser des manucures à domicile.', 7),
('Sérums fortifiants', 'Sérums pour renforcer et protéger les ongles.', 7);

CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(250) NOT NULL,
  description VARCHAR(250) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT,
  img_url VARCHAR(250),
  sous_category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sous_category_id) REFERENCES sous_category(id) ON DELETE CASCADE
);

 

CREATE TABLE avis (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  comment VARCHAR(255) NOT NULL,
  user_id INT,
   product_id INT,
   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);

CREATE TABLE wishlist (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  product_id INT,
  user_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE newsletter (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE cart (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

 
CREATE TABLE product_cart (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  quantity INT NOT NULL,
  product_id INT,
  cart_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
);

CREATE TABLE payment (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE command (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  payment VARCHAR(255) NOT NULL,
  statut VARCHAR(255) NOT NULL,
  user_id INT,
  cart_id INT,
  payment_id INT,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
);

CREATE TABLE detail_order (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  quantity INT NOT NULL,
  product_id INT,
  command_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
  FOREIGN KEY (command_id) REFERENCES command(id) ON DELETE CASCADE
);
