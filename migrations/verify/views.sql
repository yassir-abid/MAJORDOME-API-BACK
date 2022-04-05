-- Verify majordomeProject:views on pg

BEGIN;

SELECT * FROM client_and_addresses WHERE false;
SELECT * FROM client_without_addresses WHERE false;
SELECT * FROM client_with_addresses WHERE false;

ROLLBACK;
