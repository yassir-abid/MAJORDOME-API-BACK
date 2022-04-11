-- Deploy majordomeProject:views to pg

BEGIN;

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

COMMIT;
