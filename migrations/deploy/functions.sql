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


CREATE FUNCTION provider_documents(int) RETURNS SETOF document AS $$
	SELECT document.* FROM document 
	WHERE
		CASE 
			WHEN client_id IS NOT null 
				THEN (SELECT provider_id FROM client WHERE id = document.client_id) = $1 
			WHEN supplier_id IS NOT null 
				THEN (SELECT provider_id FROM supplier WHERE id = document.supplier_id) = $1
			WHEN project_id IS NOT null 
				THEN (SELECT provider_id FROM client WHERE id = (
						SELECT client_id FROM project WHERE project.id = document.project_id)) = $1
			WHEN intervention_id IS NOT null
				THEN (SELECT provider_id FROM client WHERE id = (
						SELECT client_id FROM project WHERE project.id = (
							SELECT project_id FROM intervention WHERE intervention.id = document.intervention_id))) = $1
			END
$$LANGUAGE sql STRICT;
COMMIT;
