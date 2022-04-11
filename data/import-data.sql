BEGIN;

-- Drop current data and indexes
TRUNCATE "provider", "task", "supplier", "client", "address", "project", "intervention", "picture", "document", "notification" RESTART IDENTITY;

-- Table: provider
INSERT INTO "provider" ("firstname", "lastname", "email", "phone", "address", "password", "picture") VALUES
('Marlon', 'Schultz', 'Krystel.Kassulke11@gmail.com', '0601024547', '77ter rue Descartes 92150 Suresnes', 'zbO6X7XUMmT8auE', '/picture1'),
('Hank', 'Russel', 'Tillman53@yahoo.com', '0548789652', '10bis rue Shanahan 95130 Franconville la Garenne', 'Hu67A6SgF9S4lll', '/picture2'),
('Alayna', 'Kozey', 'Franco.OReilly@hotmail.com', '0799100235', '45 avenue Hermann 92350 Le Plessis Robinson', 'UiaImhVxvx12tVY', '/picture3'),
('Chelsie', 'Swaniawski', 'Lindsey91@gmail.com', '0162368597', '29 chemin Alfredo Stravenue 33000 Bordeaux', 'J9Kanl7gmHqGUBz', '/picture4');

-- Table: task
INSERT INTO "task" ("description", "status", "provider_id") VALUES
('Dynamic Data Director', 'A faire', 1),
('Principal Division Agent', 'A faire', 4),
('Forward Response Associate', 'Terminé', 1),
('Regional Implementation Director', 'A faire', 4),
('International Marketing Executive', 'Terminé', 4);

-- Table: supplier
INSERT INTO "supplier" ("firstname", "lastname", "email", "phone", "address", "comments", "provider_id") VALUES
('Paige', 'Marks', 'Verona40@gmail.com', '0251089995', '38 rue Cazade 59000 Lille', 'Dolor excepturi quis esse et animi expedita et velit.', 4),
('Janelle', 'Bergnaum', 'Libby82@hotmail.com', '0661457131', '95 rue Michel Ange 76600 Le Havre', 'Ut odio voluptatum rerum explicabo est et.', 2),
('Nicholas', 'Weber', 'Giles_Hoppe54@gmail.com', '0421840251', '88 Rue du Limas 20600 Bastia', 'Voluptatem est amet saepe quaerat in neque eos qui.', 1);

-- Table: client
INSERT INTO "client" ("firstname", "lastname", "email", "phone", "comments", "our_equipments", "other_equipments", "needs", "provider_id") VALUES
('Eric', 'Buckridge', 'Thora.Auer@hotmail.com', '0645789542', 'Tenetur autem molestiae modi aut quos rem corporis.', 'Autem ut repellendus omnis.', 'Iste et tenetur repellat est quisquam.', 'Rem aut et facilis.', 2),
('Otho', 'Prohaska', 'Mikayla_Robel@gmail.com', '0587996245', 'Iste praesentium totam cumque assumenda fuga odio nemo vel.', 'Quae magni accusantium vero tenetur saepe nostrum ipsam incidunt.', 'Mollitia quia et fugiat occaecati sunt sed rem.', 'Quis dolores autem quae dolore praesentium nihil ut aperiam voluptatibus.', 2),
('Laurie', 'Glover', 'Maybelle48@gmail.com', '0765988524', 'Voluptatibus cumque consectetur quae incidunt sequi aut voluptas.', 'Magni assumenda minima suscipit maiores.', 'Maxime dolor quis aut est.', 'Dolorem facere laudantium laboriosam magni ut.', 4),
('Maryse', 'Stamm', 'Alysha62@yahoo.com', '0659877895', 'Quaerat exercitationem quaerat.', 'Dolor inventore a tenetur et dolorem.', 'Qui dicta voluptas.', 'Est quia magnam reprehenderit illo quae et ut.', 3),
('Bulah', 'Greenholt', 'Lamont_Mosciski@hotmail.com', '0659865898', 'Maiores blanditiis in eius consectetur temporibus error sunt.', 'Pariatur inventore vel sint facilis voluptas.', 'Modi in iusto alias dolor a hic.', 'Aut et sequi numquam.', 4),
('Madaline', 'Pfeffer', 'Brody98@gmail.com', '0658963298', 'Debitis vel unde.', 'Aut sed quae esse ut.', 'Reprehenderit nam fugiat repudiandae ducimus est nobis inventore est ut.', 'Quas dolores dolore aspernatur qui placeat consequatur quaerat nostrum.', 1);

-- Table: address
INSERT INTO "address" ("number", "street", "postal_code", "city", "comments", "client_id") VALUES
('3', 'rue Beauvau', '13005', 'Marseille', 'Labore nisi quia dolores occaecati.', 1),
('64', 'boulevard Bryas', '92400', 'Courbevoie', 'Dignissimos illum libero mollitia autem natus omnis voluptatum iusto rerum.', 1),
('22', 'Rue Roussy', '45000', 'Orléans', 'Autem qui voluptas culpa dignissimos quod quis qui corporis omnis.', 3),
('50bis', 'rue de la Hulotais', '69800', 'Saint-priest', 'Iste nihil dolorem est qui reprehenderit placeat consequatur aut.', 5),
('35', 'rue de Strasbourg', '63000', 'Clermont-ferrand', 'Autem qui voluptas culpa dignissimos quod quis qui corporis omnis.', 4),
('62', 'avenue de Provence', '26000', 'Valence', 'Iste nihil dolorem est qui reprehenderit placeat consequatur aut.', 6),
('64', 'rue des Dunes', '35400', 'Saint-malo', 'Autem qui voluptas culpa dignissimos quod quis qui corporis omnis.', 3),
('53', 'quai Saint-Nicolas', '37100', 'Tours', 'Iste nihil dolorem est qui reprehenderit placeat consequatur aut.', 2);

-- Table: project
INSERT INTO "project" ("title", "description", "status", "comments", "client_id") VALUES
('Chaudière', 'Pariatur qui numquam ducimus e Pariatur qui numquam ducimus e', 'Ouvert', 'Modi vitae cumque quaerat debitis commodi.', 1),
('Piscine', 'Pariatur qui numquam ducimus e', 'Ouvert', 'Sit odit adipisci quasi rerum vel magni.', 6),
('Evier', 'Pariatur qui numquam ducimus e', 'Clôturé', 'Consequatur sint enim error.', 4),
('Coupe et couleur', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', 'Clôturé', 'Consequatur sint enim error.', 2),
('Jardin', 'Pariatur qui numquam ducimus e', 'Vide', 'Quis non sint eum iste aut ipsa.', 3);

-- Table: intervention
INSERT INTO "intervention" ("title", "description", "date", "status", "comments", "report", "project_id", "address_id") VALUES
('Installation chaudière', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-01T16:06:25.184Z"', 'Terminée', 'Sit consequatur earum optio.', 'Pariatur qui numquam ducimus eum iste dolores est dolorum voluptatem.', 1, 1),
('Entretien chaudière', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-10-15T16:06:25.184Z"', 'Programmée', 'Sit consequatur earum optio.', 'Pariatur qui numquam ducimus eum iste dolores est dolorum voluptatem.', 1, 3),
('Trou pour piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-03-31T21:01:33.323Z"', 'Terminée', 'Asperiores sunt dignissimos unde.', 'Quia non cumque perspiciatis libero ut.', 2, 6),
('Sol piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-28T12:52:07.648Z"', 'Programmée', 'Odit voluptas aut.', 'Perferendis et provident.', 2, 6),
('Remplissage piscine', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-05-02T16:29:54.788Z"', 'Programmée', 'Incidunt non aut porro quis esse.', 'Nihil libero consequatur eveniet consequatur recusandae neque provident cum.', 2, 6),
('Fuite eau', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-04-03T07:19:23.161Z"', 'Terminée', 'Ut dolores mollitia et architecto fuga placeat consequuntur natus placeat.', 'Officia et dolorem laboriosam reprehenderit consequuntur ea nam.', 3, 4),
('Coupe et couleur', 'Enim cupiditate vel aut dicta magni dicta inventore fugit.', '"2022-03-28T12:12:50.355Z"', 'Annulée', 'Modi velit illo itaque quasi reiciendis molestiae veritatis.', 'Voluptates iusto aut et ipsa qui.', 4, 8);

-- Table: picture
INSERT INTO "picture" ("title", "status", "path", "intervention_id") VALUES
('Nulla cumque reprehenderit.', 'Avant', 'https://www.reseau-proeco-energies.fr/img/realisations/1200-5da77b18b1fc4.jpg', 1),
('Accusantium at expedita.', 'Après', 'https://cdn.w600.comps.canstockphoto.fr/essence-boiler-blanc-clipart_csp16228712.jpg', 1),
('Voluptate temporibus ullam.', 'Avant', 'https://www.normandie-tourisme.fr/wp-content/uploads/wpetourisme/jardin-de-valerianes-sma-mathilde-harel-800x600--3-.jpg', 3),
('Repudiandae est nesciunt voluptate temporibus ullam.', 'https://img1.arion-piscines-polyester.com/upload/normal/terrasser-piscine-coque.jpg', 'E8QWD%^,JW', 3),
('Omnis assumenda quisquam eos quo perferendis tempora voluptate sed.', 'Avant', 'https://media.istockphoto.com/photos/leaking-pipe-picture-id466029458?s=612x612', 6),
('Sunt quas veniam est et ratione excepturi maiores sit enim.', 'Après', 'https://media.istockphoto.com/photos/bathroom-faucet-picture-id182691828?s=612x612', 6);

-- Table: document
INSERT INTO "document" ("title", "description", "path", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Soluta distinctio quis.', 'Perspiciatis et quia.', 'r(569.^RJy', null, null, null, 6),
('Quibusdam et distinctio rerum sit voluptate aut facilis.', 'Hic accusantium id repellendus unde omnis dignissimos.', '[|8M1K3TLC', null, 1, null, 1),
('Nihil voluptas velit consectetur aut qui sit quibusdam.', 'Nisi et necessitatibus.', 'S}+A''$vb^a', 2, null, null, null),
('Dolorem illum cupiditate rerum.', 'Eos qui rerum quas iusto.', 'g8wS?{0gI#', null, 4, null, null),
('Cum vero blanditiis maiores pariatur.', 'Cupiditate et non veritatis delectus totam ut quam commodi expedita.', ';?5foQsLK%', null, null, 4, null),
('Provident quae incidunt ea non repellendus voluptas placeat aut accusantium.', 'Quidem est optio.', '''KG^T(="PL', null, 4, null, 6);

-- Table: notification
INSERT INTO "notification" ("title", "description", "date", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Reprehenderit ipsa fugit placeat.', 'Incidunt nisi ab similique non tempore autem.', '"2022-04-05T20:40:24.812Z"', null, null, null, null),
('Quibusdam soluta aspernatur reiciendis voluptatem dolores autem itaque quo nemo.', 'Exercitationem iusto recusandae excepturi sit quia inventore possimus cum.', '"2022-04-02T07:38:22.553Z"', NULL, NULL, NULL, 5),
('Nisi repellendus perferendis illo.', 'Eligendi enim deleniti.', '"2022-03-28T00:52:39.237Z"', null, 1, null, null),
('Nihil quis placeat velit et tempora blanditiis.', 'Odio et illo aspernatur veritatis culpa magnam aut voluptatem est.', '"2022-04-06T23:21:32.298Z"', 1, null, null, null),
('Cum dolor non est corrupti dolor.', 'Commodi maxime voluptatibus quia ut magnam placeat quia ut.', '"2022-04-04T11:43:55.703Z"', 1, null, null, null),
('Animi cum odio inventore assumenda maxime aut aut ipsam quia.', 'Quasi ducimus vel magni voluptatum quo.', '"2022-04-05T17:30:42.727Z"', null, null, 3, null);

COMMIT;