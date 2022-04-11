-- Verify majordomeProject:functions on pg

BEGIN;

SELECT update_project_status(1);

ROLLBACK;
