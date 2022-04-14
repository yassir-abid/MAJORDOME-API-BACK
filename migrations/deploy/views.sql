-- Deploy majordomeProject:views to pg

BEGIN;

-- View to select project and interventions
CREATE VIEW project_with_interventions AS 
SELECT project.*, json_agg(json_build_object(
								   'id', intervention.id,
								   'title', intervention.title,
								   'description', intervention.description,
								   'date', intervention.date,
								   'status', intervention.status,
								   'comments', intervention.comments,
								   'report', intervention.report,
								   'project_id', intervention.project_id,
								   'address_id', intervention.address_id
							   )) as interventions
FROM project
JOIN intervention ON intervention.project_id = project.id
GROUP BY project.id;

CREATE VIEW project_without_interventions AS
SELECT project.*, json_build_array() as interventions
FROM project
WHERE project.id <> ALL (
		SELECT intervention.project_id FROM intervention
);

CREATE VIEW project_and_interventions AS
SELECT * FROM project_with_interventions
UNION ALL
SELECT * FROM project_without_interventions;


-- View to select client and projects
CREATE VIEW client_with_projects AS
SELECT client.*,
json_agg(json_build_object('id', project_and_interventions.id, 
                            'title', project_and_interventions.title, 
                            'description', project_and_interventions.description,
                            'status', project_and_interventions.status, 
                            'comments', project_and_interventions.comments, 
                            'client_id', project_and_interventions.client_id,
                            'interventions', project_and_interventions.interventions)) as projects
FROM client
JOIN project_and_interventions ON project_and_interventions.client_id = client.id
GROUP BY client.id;

CREATE VIEW client_without_projects AS
SELECT client.*,
json_build_array() as projects
FROM client
WHERE client.id <> ALL (
		SELECT project_and_interventions.client_id FROM project_and_interventions
);

CREATE VIEW client_and_projects AS
SELECT * FROM client_with_projects
UNION ALL
SELECT * FROM client_without_projects;


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


--View to select clients and addresses and projects
CREATE VIEW client_addresses_projects AS
SELECT client.*, 
(SELECT client_and_addresses.addresses FROM client_and_addresses WHERE client_and_addresses.id = client.id) AS addresses,
(SELECT client_and_projects.projects FROM client_and_projects WHERE client_and_projects.id = client.id) AS projects
FROM client;


-- View to select project and client
CREATE VIEW project_with_client AS
SELECT
    project.*,
    json_build_object('id', client.id, 'firstname', client.firstname, 'lastname', client.lastname,
							   'email', client.email, 'phone', client.phone,
							   'comments', client.comments, 'our_equipments', client.our_equipments,
						   'other_equipments', client.other_equipments, 'needs', client.needs,
						   'provider_id', client.provider_id) as client
FROM project
JOIN client on project.client_id = client.id;


-- View to select project and client and interventions
CREATE VIEW project_client_interventions AS
SELECT project.*,
(SELECT client FROM project_with_client WHERE project_with_client.id = project.id) AS client,
(SELECT interventions FROM project_and_interventions WHERE project_and_interventions.id = project.id) AS interventions
FROM project;


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
