const { Seeder } = require('tiny-seeder');
const { faker } = require('@faker-js/faker');

const tables = [
    {
        name: 'provider',
        rows: 4,
        columns: {
            firstname: () => faker.name.firstName(),
            lastname: () => faker.name.lastName(),
            email: () => faker.internet.email(),
            phone: () => faker.phone.phoneNumber(),
            address: () => faker.address.streetAddress(true),
            password: () => faker.internet.password(),
            picture: () => faker.datatype.string(10),
        },
    },

    {
        name: 'task',
        rows: 5,
        uniques: ['public_name'],
        columns: {
            description: () => faker.name.title(),
            status: () => faker.word.verb(),
            provider_id: { to: 'provider' },
        },
    },

    {
        name: 'supplier',
        rows: 3,
        columns: {
            firstname: () => faker.name.firstName(),
            lastname: () => faker.name.lastName(),
            email: () => faker.internet.email(),
            phone: () => faker.phone.phoneNumber(),
            address: () => faker.address.streetAddress(true),
            comments: () => faker.lorem.sentence(),
            provider_id: { to: 'provider' },
        },
    },

    {
        name: 'client',
        rows: 6,
        columns: {
            firstname: () => faker.name.firstName(),
            lastname: () => faker.name.lastName(),
            email: () => faker.internet.email(),
            phone: () => faker.phone.phoneNumber(),
            comments: () => faker.lorem.sentence(),
            our_equipments: () => faker.lorem.sentence(),
            other_equipments: () => faker.lorem.sentence(),
            needs: () => faker.lorem.sentence(),
            provider_id: { to: 'provider' },
        },
    },

    {
        name: 'address',
        rows: 4,
        columns: {
            number: () => faker.datatype.number(),
            street: () => faker.address.streetName(),
            postal_code: () => faker.address.zipCodeByState('FR'),
            city: () => faker.address.cityName(),
            comments: () => faker.lorem.sentence(),
            client_id: { to: 'client' },
        },
    },

    {
        name: 'project',
        rows: 6,
        columns: {
            title: () => faker.lorem.sentence(),
            description: () => faker.lorem.sentence(),
            status: () => faker.word.verb(),
            comments: () => faker.lorem.sentence(),
            client_id: { to: 'client' },
        },
    },

    {
        name: 'intervention',
        rows: 6,
        columns: {
            title: () => faker.lorem.sentence(),
            description: () => faker.lorem.sentence(),
            date: () => faker.date.between('2022-03-28T00:00:00.000Z', '2022-04-10T00:00:00.000Z'),
            status: () => faker.word.verb(),
            comments: () => faker.lorem.sentence(),
            report: () => faker.lorem.sentence(),
            project_id: { to: 'project' },
            address_id: { to: 'address' },
        },
    },

    {
        name: 'picture',
        rows: 6,
        columns: {
            title: () => faker.lorem.sentence(),
            status: () => faker.word.verb(),
            path: () => faker.datatype.string(10),
            intervention_id: { to: 'intervention' },
        },
    },

    {
        name: 'document',
        rows: 6,
        columns: {
            title: () => faker.lorem.sentence(),
            description: () => faker.lorem.sentence(),
            path: () => faker.datatype.string(10),
            supplier_id: { to: 'supplier' },
            client_id: { to: 'client' },
            project_id: { to: 'project' },
            intervention_id: { to: 'intervention' },
        },
    },

    {
        name: 'notification',
        rows: 6,
        columns: {
            title: () => faker.lorem.sentence(),
            description: () => faker.lorem.sentence(),
            date: () => faker.date.between('2022-03-28T00:00:00.000Z', '2022-04-10T00:00:00.000Z'),
            supplier_id: { to: 'supplier' },
            client_id: { to: 'client' },
            project_id: { to: 'project' },
            intervention_id: { to: 'intervention' },
        },
    },

    {
        name: 'token',
        rows: 6,
        columns: {
            token: () => faker.datatype.string(20),
            date: () => faker.date.recent(),
            date: () => faker.date.recent(),
            provider_id: { to: 'provider' },
        },
    },
];

const seeder = new Seeder(tables, { directory: './data', truncate: true });

seeder.generate();
