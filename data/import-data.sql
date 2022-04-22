BEGIN;

-- Drop current data and indexes
TRUNCATE "token", "provider", "task", "supplier", "client", "address", "project", "intervention", "picture", "document", "notification" RESTART IDENTITY;

-- Table: provider
INSERT INTO "provider" ("firstname", "lastname", "email", "phone", "address", "password", "picture") VALUES
('Majordome', 'O''clock', 'majordome@gmail.com', '0601024547', '77ter rue Descartes 92150 Suresnes', '$2b$10$cbyabzvBZBsnkA7PdRmYbeYxO9Oj7XGZ0NgKKulkWk4NfMDSoL1g6', null),
('Jean', 'Dupont', 'jean.dupont@gmail.com', '0548789652', '10bis rue Shanahan 95130 Franconville la Garenne', '$2b$10$J6bDLJhTE8V7S11Fq5mWeuwS6OFj/crq/vDBxUlneX73XC0WOTcYq', null);

-- Table: task
INSERT INTO "task" ("description", "status", "provider_id") VALUES
('Dynamic Data Director', 'A faire', 1),
('Principal Division Agent', 'A faire', 1),
('Forward Response Associate', 'Terminé', 1),
('Regional Implementation Director', 'A faire', 2),
('International Marketing Executive', 'Terminé', 2);

-- Table: supplier
INSERT INTO "supplier" ("firstname", "lastname", "email", "phone", "address", "comments", "provider_id") VALUES
('Paige', 'Marks', 'Verona40@gmail.com', '0251089995', '38 rue Cazade 59000 Lille', 'Dolor excepturi quis esse et animi expedita et velit.', 1),
('Janelle', 'Bergnaum', 'Libby82@hotmail.com', '0661457131', '95 rue Michel Ange 76600 Le Havre', 'Ut odio voluptatum rerum explicabo est et.', 1),
('Nicholas', 'Weber', 'Giles_Hoppe54@gmail.com', '0421840251', '88 Rue du Limas 20600 Bastia', 'Voluptatem est amet saepe quaerat in neque eos qui.', 2);

-- Table: client
INSERT INTO "client" ("firstname", "lastname", "email", "phone", "comments", "our_equipments", "other_equipments", "needs", "provider_id") VALUES
('Eric', 'Buckridge', 'Thora.Auer@hotmail.com', '0645789542', 'Tenetur autem molestiae modi aut quos rem corporis.', 'Autem ut repellendus omnis.', 'Iste et tenetur repellat est quisquam.', 'Rem aut et facilis.', 1),
('Otho', 'Prohaska', 'Mikayla_Robel@gmail.com', '0587996245', 'Iste praesentium totam cumque assumenda fuga odio nemo vel.', 'Quae magni accusantium vero tenetur saepe nostrum ipsam incidunt.', 'Mollitia quia et fugiat occaecati sunt sed rem.', 'Quis dolores autem quae dolore praesentium nihil ut aperiam voluptatibus.', 2);

-- Table: address
INSERT INTO "address" ("number", "street", "postal_code", "city", "comments", "client_id") VALUES
('3', 'rue Beauvau', '13005', 'Marseille', 'Labore nisi quia dolores occaecati.', 1),
('50bis', 'rue de la Hulotais', '69800', 'Saint-priest', 'Iste nihil dolorem est qui reprehenderit placeat consequatur aut.', 1),
('35', 'rue de Strasbourg', '63000', 'Clermont-ferrand', 'Autem qui voluptas culpa dignissimos quod quis qui corporis omnis.', 2);

-- Table: project
INSERT INTO "project" ("title", "description", "status", "comments", "client_id") VALUES
('Chaudière', 'Pariatur qui numquam ducimus e Pariatur qui numquam ducimus e', 'Ouvert', 'Modi vitae cumque quaerat debitis commodi.', 1),
('Evier', 'Pariatur qui numquam ducimus e', 'Clôturé', 'Consequatur sint enim error.', 1),
('Piscine', 'Pariatur qui numquam ducimus e', 'Ouvert', 'Sit odit adipisci quasi rerum vel magni.', 2),
('Jardin', 'Pariatur qui numquam ducimus e', 'Vide', 'Quis non sint eum iste aut ipsa.', 2);

-- Table: intervention
INSERT INTO "intervention" ("title", "description", "date", "duration", "status", "comments", "report", "project_id", "address_id") VALUES
('Installation chaudière', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-14T16:06:25.184Z"', '2 hours', 'Terminée', 'Sit consequatur earum optio.', 'Pariatur qui numquam ducimus eum iste dolores est dolorum voluptatem.', 1, 1),
('Entretien chaudière', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-17T16:06:25.184Z"', '2 hours', 'Programmée', 'Sit consequatur earum optio.', 'Pariatur qui numquam ducimus eum iste dolores est dolorum voluptatem.', 1, 1),
('Fuite eau', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-17T07:19:23.161Z"', '2 hours', 'Programmée', 'Ut dolores mollitia et architecto fuga placeat consequuntur natus placeat.', 'Officia et dolorem laboriosam reprehenderit consequuntur ea nam.', 2, 2),
('Trou pour piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-03-31T21:01:33.323Z"', '2 hours', 'Terminée', 'Asperiores sunt dignissimos unde.', 'Quia non cumque perspiciatis libero ut.', 3, 3),
('Sol piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-28T12:52:07.648Z"', '2 hours', 'Programmée', 'Odit voluptas aut.', 'Perferendis et provident.', 3, 3),
('Remplissage piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-05-02T16:29:54.788Z"', '2 hours', 'Programmée', 'Incidunt non aut porro quis esse.', 'Nihil libero consequatur eveniet consequatur recusandae neque provident cum.', 3, 3);

-- Table: picture
INSERT INTO "picture" ("title", "status", "path", "intervention_id") VALUES
('Chaudière', 'Avant', 'https://www.reseau-proeco-energies.fr/img/realisations/1200-5da77b18b1fc4.jpg', 1),
('Chaudière', 'Après', 'https://cdn.w600.comps.canstockphoto.fr/essence-boiler-blanc-clipart_csp16228712.jpg', 1),
('Trou-piscine', 'Avant', 'https://www.normandie-tourisme.fr/wp-content/uploads/wpetourisme/jardin-de-valerianes-sma-mathilde-harel-800x600--3-.jpg', 4),
('Trou-piscine', 'https://img1.arion-piscines-polyester.com/upload/normal/terrasser-piscine-coque.jpg', 'E8QWD%^,JW', 4);

-- Table: document
INSERT INTO "document" ("title", "description", "path", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Soluta distinctio quis.', 'Perspiciatis et quia.', 'r(569.^RJy', null, null, null, 1),
('Quibusdam et distinctio rerum sit voluptate aut facilis.', 'Hic accusantium id repellendus unde omnis dignissimos.', '[|8M1K3TLC', null, null, null, 2),
('Nihil voluptas velit consectetur aut qui sit quibusdam.', 'Nisi et necessitatibus.', 'S}+A''$vb^a', null, 1, null, null),
('Dolorem illum cupiditate rerum.', 'Eos qui rerum quas iusto.', 'g8wS?{0gI#', null, 2, null, null);

-- Table: notification
INSERT INTO "notification" ("title", "description", "date", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Reprehenderit ipsa fugit placeat.', 'Incidunt nisi ab similique non tempore autem.', '"2022-04-05T20:40:24.812Z"', null, null, null, null),
('Quibusdam soluta aspernatur reiciendis voluptatem dolores autem itaque quo nemo.', 'Exercitationem iusto recusandae excepturi sit quia inventore possimus cum.', '"2022-04-02T07:38:22.553Z"', NULL, NULL, NULL, 5),
('Nisi repellendus perferendis illo.', 'Eligendi enim deleniti.', '"2022-03-28T00:52:39.237Z"', null, 1, null, null),
('Nihil quis placeat velit et tempora blanditiis.', 'Odio et illo aspernatur veritatis culpa magnam aut voluptatem est.', '"2022-04-06T23:21:32.298Z"', 1, null, null, null),
('Cum dolor non est corrupti dolor.', 'Commodi maxime voluptatibus quia ut magnam placeat quia ut.', '"2022-04-04T11:43:55.703Z"', 1, null, null, null),
('Animi cum odio inventore assumenda maxime aut aut ipsam quia.', 'Quasi ducimus vel magni voluptatum quo.', '"2022-04-05T17:30:42.727Z"', null, null, 3, null);

COMMIT;