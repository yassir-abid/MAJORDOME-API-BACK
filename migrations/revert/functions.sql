-- Revert majordomeProject:functions from pg

BEGIN;

DROP FUNCTION update_project_status(int);

DROP FUNCTION provider_documents(int);

COMMIT;
