BEGIN;

-- Drop current data and indexes
TRUNCATE "provider", "task", "supplier", "client", "address", "project", "intervention", "picture", "document", "notification", "token" RESTART IDENTITY;

-- Table: provider
INSERT INTO "provider" ("firstname", "lastname", "email", "phone", "address", "password", "picture") VALUES
('Forest', 'Frami', 'Constantin.Blick@yahoo.com', '(820) 724-0619 x926', '25574 Fatima Rapids Apt. 144', 's4rk1djafX9amfg', '?aW|>nnkG%'),
('Neil', 'Runolfsson', 'Shanie27@hotmail.com', '224.309.2681 x58655', '567 Jacobs Drive Apt. 969', 'nsYBs3PAo809tIL', 'DyT3(,aaQ^'),
('Harmon', 'Bartell', 'Napoleon90@yahoo.com', '(226) 825-1217 x2714', '335 Vickie Fords Apt. 689', '6n5mUZu0rVofn_q', ')9y]RK62;)'),
('Cassidy', 'Wehner', 'Alessandro30@gmail.com', '646.745.7218', '56442 Murazik Mountain Apt. 279', 's_2C0cYa_o0QFEZ', 't$-&KaP*kq');

-- Table: task
INSERT INTO "task" ("description", "status", "provider_id") VALUES
('Dynamic Branding Analyst', 'suborn', 4),
('Chief Optimization Supervisor', 'recap', 2),
('Direct Directives Coordinator', 'remand', 2),
('Global Functionality Architect', 'refer', 2),
('Senior Applications Developer', 'hospitalise', 1);

-- Table: supplier
INSERT INTO "supplier" ("firstname", "lastname", "email", "phone", "address", "comments", "provider_id") VALUES
('Pierce', 'Graham', 'Leonie.Hudson9@hotmail.com', '494.417.4053 x997', '5757 Anais Flat Apt. 376', 'Neque vitae et tenetur laborum explicabo qui.', 4),
('Kaleb', 'Crooks', 'Michelle6@yahoo.com', '914.202.0174 x3069', '098 Reinger Forge Apt. 585', 'Eveniet assumenda et dignissimos consectetur.', 1),
('Ashtyn', 'Prosacco', 'Emelie.Grady0@gmail.com', '840.976.0698', '6376 Grady Ferry Apt. 941', 'Unde id ullam quo fugiat molestiae.', 1);

-- Table: client
INSERT INTO "client" ("firstname", "lastname", "email", "phone", "comments", "our_equipments", "other_equipments", "needs", "provider_id") VALUES
('Nola', 'Armstrong', 'Richie64@gmail.com', '846.962.9323 x2877', 'Qui in ut earum totam aut laborum illum.', 'Voluptas culpa quibusdam culpa perspiciatis ipsa magnam.', 'Nam earum aliquam fugiat.', 'Dolorem magnam rerum eaque.', 2),
('Gennaro', 'Zulauf', 'Gust_Murray52@hotmail.com', '234-281-9200 x95736', 'Aut iusto optio id rerum.', 'Ipsum laudantium reiciendis sint nostrum hic odit.', 'Suscipit deleniti nihil sapiente.', 'Et aliquid ad eveniet consectetur.', 1),
('Jaydon', 'Koelpin', 'Anabelle_West@yahoo.com', '705-849-8480 x118', 'Quia quis recusandae voluptate sit et sapiente.', 'Ad autem consectetur magni.', 'Non inventore dolore et est facilis.', 'Natus deserunt magni earum voluptatem commodi quasi iste magni.', 1),
('Mckenzie', 'Grady', 'River_Tremblay@hotmail.com', '(941) 573-3978 x2240', 'Id est consectetur.', 'Blanditiis ea ut reprehenderit nihil ipsum placeat.', 'Nisi ex quasi aut eum aut possimus quia itaque placeat.', 'Non ut quas illo nisi alias.', 4),
('Lon', 'Heller', 'Lauretta_Zemlak35@hotmail.com', '938.390.5679 x77479', 'In eos deleniti voluptatem sit vel culpa illum sit aliquam.', 'Sed ipsa laudantium ad natus quis.', 'Expedita omnis velit at corrupti asperiores.', 'Quos laboriosam modi vitae in.', 1),
('Myrna', 'VonRueden', 'Lora_Stoltenberg38@hotmail.com', '632.648.5397 x211', 'Suscipit unde sed excepturi soluta aspernatur consequatur doloribus voluptas.', 'Sint quasi dolores facilis molestias est dolorem neque.', 'Id nam ut provident.', 'Corrupti cupiditate provident quia exercitationem dolorum.', 2);

-- Table: address
INSERT INTO "address" ("number", "street", "postal_code", "city", "comments", "client_id") VALUES
(51379, 'Jovanny Club', '50984', 'Nashua', 'Facilis necessitatibus molestias nesciunt non autem minus.', 1),
(70707, 'Dawn Isle', '96139-1609', 'Elyria', 'Quis animi accusamus.', 5),
(63419, 'Hoeger Ramp', '94239-7026', 'Westminster', 'Fuga ea rem placeat praesentium iste rerum ex.', 1),
(687, 'Hermann Ports', '39462', 'The Villages', 'Libero quos ut voluptate qui ducimus id sit.', 4);

-- Table: project
INSERT INTO "project" ("title", "description", "status", "comments", "client_id") VALUES
('Et minus at.', 'Omnis quos et aut sed delectus.', 'synthesise', 'Dicta vel aut illo est.', 6),
('Sed deserunt ex expedita velit exercitationem perspiciatis est sapiente.', 'Natus repellat labore sed sunt quis asperiores quisquam.', 'carp', 'Earum et voluptatem quos.', 2),
('Et atque in fugiat minima qui cumque voluptas repellendus repudiandae.', 'Et quia tenetur earum recusandae et porro qui aliquam.', 'hurtle', 'Quidem sequi in non nulla eos omnis.', 1),
('Est pariatur non neque animi eos repudiandae nobis est aut.', 'Occaecati sed nihil aut et repellendus iusto.', 'bribe', 'Quos sint est quia rerum non consequuntur quis provident quis.', 4),
('Possimus dolores explicabo nemo asperiores.', 'Ipsum quis sunt sint.', 'endow', 'Iusto cumque voluptate dolor soluta sunt reiciendis adipisci.', 4),
('Corporis deleniti praesentium.', 'Ullam qui at tenetur quae.', 'programme', 'Ut debitis recusandae officia rem omnis reiciendis.', 1);

-- Table: intervention
INSERT INTO "intervention" ("title", "description", "date", "status", "comments", "report", "project_id", "address_id") VALUES
('Dolores amet velit sed cum.', 'Debitis asperiores ea suscipit.', '"2022-03-30T21:55:29.550Z"', 'scatter', 'Totam est velit.', 'Atque voluptatem quis aut.', 5, 1),
('Impedit similique aut reprehenderit magnam sunt quaerat nisi.', 'Voluptas natus cupiditate et molestiae ex eum vero nisi.', '"2022-04-05T18:10:15.311Z"', 'wow', 'Laborum est ut ab et ipsa quo commodi voluptatum.', 'Quasi voluptatem consequatur natus.', 3, 1),
('Quo omnis sit.', 'Quis quis et.', '"2022-03-31T15:36:29.217Z"', 'pardon', 'Quibusdam eveniet minima voluptatem laboriosam qui et provident aut.', 'Velit sunt nemo facilis unde sit doloribus quisquam dignissimos.', 2, 2),
('Perferendis et qui consequuntur.', 'Velit nihil eligendi quasi.', '"2022-04-07T13:43:12.457Z"', 'boob', 'Quia sequi repellendus est dolorem et sint earum est incidunt.', 'Qui expedita aspernatur ipsum qui est quasi.', 1, 1),
('Illo animi eos consectetur animi ullam quos minima qui.', 'Enim et totam et consequuntur sit et debitis nesciunt et.', '"2022-04-08T08:42:37.208Z"', 'annoy', 'Est explicabo aliquam nemo sit sit ipsam eos.', 'Praesentium pariatur id id molestiae qui temporibus cum.', 3, 3),
('Earum voluptas suscipit et voluptas et aut sed consequatur.', 'Et saepe necessitatibus ut sed tempora et.', '"2022-03-29T21:19:25.463Z"', 'burble', 'Nesciunt occaecati nesciunt.', 'Laborum accusantium ea omnis sit et ipsum dolores et.', 5, 1);

-- Table: picture
INSERT INTO "picture" ("title", "status", "path", "intervention_id") VALUES
('Et eum ut molestias minima placeat libero deleniti molestiae qui.', 'delight', '+O(`2$}Q`e', 3),
('Enim sunt nihil voluptatem architecto quam ipsum ut quia.', 'unzip', '6N1Yu.b6$V', 2),
('Placeat quia sit in distinctio qui accusantium velit placeat.', 'enumerate', 'J0qE![rfg6', 4),
('Aperiam eum quod dolores porro exercitationem aperiam error nemo nemo.', 'auction', 'g52Ez*w^0w', 6),
('Aut molestiae omnis occaecati et est ullam.', 'gallivant', ';t="q9J''W`', 4),
('Nesciunt doloremque vel laborum ut maiores inventore quia.', 'off', 'BG](p|]%@K', 3);

-- Table: document
INSERT INTO "document" ("title", "description", "path", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Quidem voluptatem id aut recusandae et eos inventore est.', 'Necessitatibus rerum omnis.', ',+Z[az<\}F', 3, 3, 6, 6),
('Quo iste neque mollitia voluptatibus commodi nobis amet voluptatibus molestiae.', 'Accusamus recusandae et aliquid veniam suscipit ducimus accusantium eveniet.', 'Cf-1S%;->f', 1, 2, 5, 5),
('Ut dolores culpa dolores voluptatem.', 'Quam ullam vero vero autem.', '!ZKqJAUOhD', 3, 6, 3, 2),
('Aut officia nesciunt et inventore sed qui sapiente.', 'Minima alias dignissimos corporis eveniet ut fugiat molestiae.', '>?uAU6h7X?', 1, 2, 4, 2),
('Et aliquam eum officiis et.', 'Non voluptatum molestiae omnis.', 'FoMh4w)xNk', 2, 3, 6, 6),
('Omnis repellat numquam fugit dolorem culpa et autem animi eum.', 'Quis quis quia fugit alias blanditiis impedit sint rem.', 'c``k+2R#y[', 1, 1, 3, 5);

-- Table: notification
INSERT INTO "notification" ("title", "description", "date", "supplier_id", "client_id", "project_id", "intervention_id") VALUES
('Magni est molestiae.', 'Dolores assumenda fuga sit aut fuga doloribus et iusto fugiat.', '"2022-04-08T04:27:22.726Z"', 3, 5, 6, 1),
('Ut et recusandae doloremque minus aut.', 'Consequatur minima deleniti et occaecati pariatur nesciunt rerum voluptas doloribus.', '"2022-03-29T17:44:24.736Z"', 2, 4, 3, 4),
('Ea omnis enim delectus nemo ducimus corrupti.', 'Officiis aliquam asperiores mollitia commodi corporis adipisci nesciunt molestias aut.', '"2022-03-29T11:08:45.059Z"', 1, 1, 6, 5),
('Veritatis aperiam dolorem laborum reprehenderit sunt soluta veritatis deserunt.', 'Voluptatum occaecati impedit aliquam reiciendis dolores rerum repudiandae et at.', '"2022-04-09T20:52:58.087Z"', 3, 5, 3, 3),
('Libero similique sed nihil sed.', 'Dolore corporis repellendus saepe aut repellat vel.', '"2022-04-08T20:43:14.551Z"', 3, 4, 1, 1),
('Et sed unde.', 'Culpa porro sint adipisci ab voluptate error incidunt perferendis magnam.', '"2022-04-08T12:59:05.911Z"', 3, 2, 3, 5);

-- Table: token
INSERT INTO "token" ("token", "creation_date", "expiring_date", "provider_id") VALUES
('UQ6#o#9gH@it6_:!(_R[', '"2022-04-13T05:50:54.761Z"', '"2022-04-13T06:00:54.761Z"', 3),
('VRyPSWf\v)NJtVrdg3jv', '"2022-04-13T07:17:51.470Z"', '"2022-04-13T07:27:51.470Z"', 4),
('X1bI+$Kb{,<0Sysy$1D+', '"2022-04-13T19:36:28.195Z"', '"2022-04-13T19:46:28.195Z"', 4),
('elRW0)x$HCYu;AE<fCEs', '"2022-04-13T09:21:05.998Z"', '"2022-04-13T09:31:05.998Z"', 4),
('cY98XRZDIylT5hV$0|yl', '"2022-04-13T17:01:33.870Z"', '"2022-04-13T17:11:33.870Z"', 1),
('7Q:p3.CjHicj:f'':%K/^', '"2022-04-13T15:30:20.280Z"', '"2022-04-13T15:40:20.280Z"', 2);

COMMIT;
