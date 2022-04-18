-- Verify majordomeProject:init on pg

BEGIN;

SELECT * FROM "provider" WHERE false;
SELECT * FROM "task" WHERE false;
SELECT * FROM "supplier" WHERE false;
SELECT * FROM "client" WHERE false;
SELECT * FROM "address" WHERE false;
SELECT * FROM "project" WHERE false;
SELECT * FROM "intervention" WHERE false;
SELECT * FROM "picture" WHERE false;
SELECT * FROM "document" WHERE false;
SELECT * FROM "notification" WHERE false;
SELECT * FROM "token" WHERE false;

ROLLBACK;
