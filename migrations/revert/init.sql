-- Revert majordomeProject:init from pg

BEGIN;

DROP TABLE "token", "notification", "document", "picture", "intervention", "project", "address", "client", "supplier", "task", "provider" CASCADE;

COMMIT;
