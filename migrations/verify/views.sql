-- Verify majordomeProject:views on pg

BEGIN;

-- View to select project and interventions
SELECT * FROM project_and_interventions WHERE false;
SELECT * FROM project_without_interventions WHERE false;
SELECT * FROM project_with_interventions WHERE false;


-- View to select clients and projects
SELECT * FROM client_and_projects WHERE false;
SELECT * FROM client_without_projects WHERE false;
SELECT * FROM client_with_projects WHERE false;


-- View to select clients and addresses
SELECT * FROM client_and_addresses WHERE false;
SELECT * FROM client_without_addresses WHERE false;
SELECT * FROM client_with_addresses WHERE false;


--View to select clients and addresses and projects
SELECT * FROM client_addresses_projects WHERE false;


-- View to select project with client
SELECT * FROM project_with_client WHERE false;


-- View to select project and client and interventions
SELECT * FROM project_client_interventions WHERE false;


-- View to select report and pictures
SELECT * FROM report_with_pictures WHERE false;
SELECT * FROM report_without_pictures WHERE false;
SELECT * FROM report_and_pictures WHERE false;

ROLLBACK;
