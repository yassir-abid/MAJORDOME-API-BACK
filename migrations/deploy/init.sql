-- Deploy majordomeProject:init to pg
BEGIN;
CREATE TABLE "provider" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "address" TEXT,
  "password" TEXT NOT NULL
);
CREATE TABLE "task" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'A faire',
  "provider_id" INT NOT NULL REFERENCES "provider"("id") CHECK (provider_id > 0)
);
CREATE TABLE "supplier" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT NOT NULL,
  "address" TEXT,
  "comments" TEXT,
  "provider_id" INT NOT NULL REFERENCES "provider"("id") CHECK (provider_id > 0)
);
CREATE TABLE "client" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT NOT NULL,
  "comments" TEXT,
  "our_equipments" TEXT,
  "other_equipments" TEXT,
  "needs" TEXT,
  "provider_id" INT NOT NULL REFERENCES "provider"("id") CHECK (provider_id > 0)
);
CREATE TABLE "address" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "number" TEXT NOT NULL,
  "street" TEXT NOT NULL,
  "postal_code" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "comments" TEXT,
  "client_id" INT NOT NULL REFERENCES "client"("id") CHECK (client_id > 0)
);
CREATE TABLE "project" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT,
  "comments" TEXT,
  "client_id" INT NOT NULL REFERENCES "client"("id") CHECK (client_id > 0)
);
CREATE TABLE "intervention" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "status" TEXT NOT NULL DEFAULT 'Programmée',
  "comments" TEXT,
  "report" TEXT,
  "project_id" INT NOT NULL REFERENCES "project"("id") CHECK (project_id > 0)
);
CREATE TABLE "picture" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "intervention_id" INT NOT NULL REFERENCES "intervention"("id") CHECK (intervention_id > 0)
);
CREATE TABLE "document" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "path" TEXT NOT NULL,
  "supplier_id" INT REFERENCES "supplier"("id") CHECK (supplier_id > 0),
  "client_id" INT REFERENCES "client"("id") CHECK (client_id > 0),
  "project_id" INT REFERENCES "project"("id") CHECK (project_id > 0),
  "intervention_id" INT REFERENCES "intervention"("id") CHECK (intervention_id > 0)
);
CREATE TABLE "notification" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "supplier_id" INT REFERENCES "supplier"("id") CHECK (supplier_id > 0),
  "client_id" INT REFERENCES "client"("id") CHECK (client_id > 0),
  "project_id" INT REFERENCES "project"("id") CHECK (project_id > 0),
  "intervention_id" INT REFERENCES "intervention"("id") CHECK (intervention_id > 0)
);
COMMIT;
