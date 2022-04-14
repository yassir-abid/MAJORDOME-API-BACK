-- Revert majordomeProject:views from pg

BEGIN;

--View to select clients and addresses and projects
DROP VIEW client_addresses_projects;


-- -- View to select project and client and interventions
DROP VIEW project_client_interventions;


-- View to select client and addresses
DROP VIEW client_and_addresses;
DROP VIEW client_without_addresses;
DROP VIEW client_with_addresses;


-- View to select client and projects
DROP VIEW client_and_projects;
DROP VIEW client_without_projects;
DROP VIEW client_with_projects;


-- View to select project and interventions
DROP VIEW project_and_interventions;
DROP VIEW project_without_interventions;
DROP VIEW project_with_interventions;


-- View to select project with client
DROP VIEW project_with_client;


-- View to select report and pictures
DROP VIEW report_and_pictures;
DROP VIEW report_without_pictures;
DROP VIEW report_with_pictures;


COMMIT;
