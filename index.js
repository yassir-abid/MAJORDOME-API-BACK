const http = require('http');
require('dotenv').config();
const debug = require('debug')('app:server');
const app = require('./app');
const cache = require('./app/middlewares/cache');

const port = process.env.PORT ?? 3000;

const server = http.createServer(app);

cache.connect().then(() => {
    server.listen(port, () => {
        debug(`Listening on ${port}`);
    });
});
