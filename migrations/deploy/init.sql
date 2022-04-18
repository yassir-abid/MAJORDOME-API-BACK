-- Deploy majordomeProject:init to pg
BEGIN;
CREATE TABLE "provider" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "address" TEXT,
  "password" TEXT NOT NULL,
  "picture" TEXT
);
CREATE TABLE "task" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT NOT NULL,
  "status" TEXT DEFAULT 'A faire',
  "provider_id" INT NOT NULL REFERENCES "provider"("id") ON DELETE CASCADE
);
CREATE TABLE "supplier" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT NOT NULL,
  "address" TEXT,
  "comments" TEXT,
  "provider_id" INT NOT NULL REFERENCES "provider"("id") ON DELETE CASCADE
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
  "provider_id" INT NOT NULL REFERENCES "provider"("id") ON DELETE CASCADE
);
CREATE TABLE "address" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "number" TEXT NOT NULL,
  "street" TEXT NOT NULL,
  "postal_code" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "comments" TEXT,
  "client_id" INT NOT NULL REFERENCES "client"("id") ON DELETE CASCADE
);
CREATE TABLE "project" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT DEFAULT 'Vide',
  "comments" TEXT,
  "client_id" INT NOT NULL REFERENCES "client"("id") ON DELETE CASCADE
);
CREATE TABLE "intervention" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "date" TIMESTAMPTZ DEFAULT NOW(),
  "duration" INTERVAL DEFAULT '2 hours' NOT NULL,
  "status" TEXT DEFAULT 'Programmée',
  "comments" TEXT,
  "report" TEXT,
  "project_id" INT NOT NULL REFERENCES "project"("id") ON DELETE CASCADE,
  "address_id" INT NOT NULL REFERENCES "address"("id") ON DELETE CASCADE
);
CREATE TABLE "picture" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "path" TEXT NOT NULL,
  "intervention_id" INT NOT NULL REFERENCES "intervention"("id") ON DELETE CASCADE
);
CREATE TABLE "document" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "path" TEXT NOT NULL,
  "supplier_id" INT REFERENCES "supplier"("id") ON DELETE CASCADE,
  "client_id" INT REFERENCES "client"("id") ON DELETE CASCADE,
  "project_id" INT REFERENCES "project"("id") ON DELETE CASCADE,
  "intervention_id" INT REFERENCES "intervention"("id") ON DELETE CASCADE
);
CREATE TABLE "notification" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "date" TIMESTAMPTZ DEFAULT NOW(),
  "supplier_id" INT REFERENCES "supplier"("id") ON DELETE CASCADE,
  "client_id" INT REFERENCES "client"("id") ON DELETE CASCADE,
  "project_id" INT REFERENCES "project"("id") ON DELETE CASCADE,
  "intervention_id" INT REFERENCES "intervention"("id") ON DELETE CASCADE
);

CREATE TABLE "token" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "token" TEXT NOT NULL,
  "creation_date" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "expiring_date" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "provider_id" INT REFERENCES "provider"("id") ON DELETE CASCADE
);

COMMIT;
