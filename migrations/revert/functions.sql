-- Revert majordomeProject:functions from pg

BEGIN;

DROP FUNCTION update_project_status(int);

COMMIT;
