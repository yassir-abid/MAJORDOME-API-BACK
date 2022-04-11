-- Deploy majordomeProject:functions to pg

BEGIN;

CREATE FUNCTION update_project_status(int) RETURNS void AS $$
	UPDATE project SET status =
	CASE
		WHEN EXISTS (SELECT status FROM intervention WHERE project_id = $1 AND status = 'Programmée') THEN 'Ouvert'
		WHEN EXISTS (SELECT status FROM intervention WHERE project_id = $1 AND status = 'Annulée') THEN 'Clôturé'
		WHEN EXISTS (SELECT status FROM intervention WHERE project_id = $1 AND status = 'Terminée') THEN 'Clôturé'
		ELSE 'Vide'
		END
	WHERE id = $1;
$$LANGUAGE sql STRICT;

COMMIT;
