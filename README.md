# MAJORDOME

## App Overview

This app aims to help itinerant self-employed craftsmen (ardener, plumber, hairdresser, painter, etc.) in organizing their activities: clients, interventions, schedule, document, etc.

It was developed by a team of 2 backend developers and 3 frontend developers, in 3 weeks.

**[See app presentation](https://youtu.be/fIBe2SE69I0)**

**[See app website](https://majordome-app.herokuapp.com/)**

### Architecture

This app has been organized according to a microservices architecture.

This repository concerns the back part, which is a Rest API.

The front part source code, is available [HERE](https://github.com/yassir-abid/MAJORDOME-APP-FRONT).

### Useful Links

- [App presentation](https://youtu.be/fIBe2SE69I0)

- [App website](https://majordome-app.herokuapp.com/)

- [App source code](https://github.com/yassir-abid/MAJORDOME-APP-FRONT)

- [API documentation website](https://majordome-api.herokuapp.com/)

### Conception

API CDM is availble in the conception folder.

## Getting Started

1- After cloning the project and from the project directory, run `npm install` to retrieve all necessary packages

2- Create a Postgresql database

3- Install **[Sqitch](https://sqitch.org/)**

*For Debian: `sudo apt-get install sqitch libdbd-pg-perl postgresql-client libdbd-sqlite3-perl sqlite3`*

4- Create files:

- `.env` based on `.env.example`
- `sqitch.conf` for the sqitch migrations, based on `sqitch.example.conf`

5- Run `sqitch deploy`, then `sqitch verify`.

6- Run the seeding script: `psql -U <user> -d <database> -f data/import-data.sql`

7- Finally, run the following script to launch app: `npm run dev`
