-- Revert majordomeProject:views from pg

BEGIN;

DROP VIEW client_and_addresses;
DROP VIEW client_without_addresses;
DROP VIEW client_with_addresses;

DROP VIEW report_and_pictures;
DROP VIEW report_without_pictures;
DROP VIEW report_with_pictures;
COMMIT;
