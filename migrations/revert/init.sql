-- Revert majordomeProject:init from pg

BEGIN;

DROP TABLE "notification", "document", "picture", "intervention", "project", "address", "client", "supplier", "task", "provider";

COMMIT;
