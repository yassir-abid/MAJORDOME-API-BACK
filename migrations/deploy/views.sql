-- Deploy majordomeProject:views to pg

BEGIN;

-- View to select client and addresses
CREATE VIEW client_with_addresses AS
SELECT
	client.*,
	json_agg(json_build_object('id', address.id, 'number', address.number, 'street', address.street,
							   'postal_code', address.postal_code, 'city', address.city,
							   'comments', address.comments, 'client_id', address.client_id)) as addresses
FROM client
JOIN address on address.client_id = client.id
GROUP BY client.id;

CREATE VIEW client_without_addresses AS
SELECT client.*, json_build_array() as addresses FROM client
WHERE client.id <> ALL (
		SELECT address.client_id FROM address
);

CREATE VIEW client_and_addresses AS
SELECT * FROM client_with_addresses
UNION ALL
SELECT * FROM client_without_addresses;


-- View to select project and client
CREATE VIEW project_with_client AS
SELECT
    project.*,
    json_agg(json_build_object('id', client.id, 'firstname', client.firstname, 'lastname', client.lastname,
							   'email', client.email, 'phone', client.phone,
							   'comments', client.comments, 'our_equipments', client.our_equipments,
						   'other_equipments', client.other_equipments, 'needs', client.needs,
						   'provider_id', client.provider_id)) as client
FROM project
JOIN client on project.client_id = client.id
GROUP BY project.id;


-- View to select intervention report and pictures
CREATE VIEW report_with_pictures AS
SELECT intervention.id, intervention.title, intervention.description, intervention.date, intervention.report,
json_agg(json_build_object('id', picture.id,
				'title', picture.title,
				'status', picture.status,
				'path', picture.path,
				'intervention_id', picture.intervention_id))
				AS pictures
FROM intervention
JOIN picture ON picture.intervention_id = intervention.id
GROUP BY intervention.id;

CREATE VIEW report_without_pictures AS
SELECT intervention.id, intervention.title, intervention.description, intervention.date, intervention.report,
json_build_array() AS pictures FROM intervention
WHERE intervention.id <> ALL (
		SELECT picture.intervention_id FROM picture
);

CREATE VIEW report_and_pictures AS
SELECT * FROM report_with_pictures 
UNION ALL
SELECT * FROM report_without_pictures;

COMMIT;
