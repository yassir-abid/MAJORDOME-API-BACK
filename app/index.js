const path = require('path');
const express = require('express');
const cors = require('cors');

const cleaner = require('./helpers/cleaner');

const router = require('./routers');

const app = express();
require('./helpers/apiDocs')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_DOMAINS ?? '*',
};

app.use(cors(corsOptions));

app.use(cleaner);

app.use(router);

module.exports = app;
