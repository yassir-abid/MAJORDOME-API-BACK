-- Revert majordomeProject:views from pg

BEGIN;

DROP VIEW client_and_addresses;
DROP VIEW client_without_addresses;
DROP VIEW client_with_addresses;
DROP VIEW project_with_client;

COMMIT;
