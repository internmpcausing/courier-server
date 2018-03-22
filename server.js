'use strict';


require('express-async-errors');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    pingInterval: 5000,
    pingTimeout: 5000
});
module.exports.io = io;
const path = require('path');
const unirest = require('unirest');
const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, 'index.html');
const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const config = require('./config/config');
const logger = require('./util/logger');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

mongoose.connect(config.database.uri);
// On Connection
mongoose.connection.on('connected', () => {logger.debug('Connected to Database ')});
// On Error
mongoose.connection.on('error', (err) => {logger.error('Database error '+err)});

server.listen(PORT, () => logger.debug(`Listening on ${PORT}`));

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
const map = require('./routes/map');
app.use('/api/map', map);

const users = require('./routes/user');
app.use('/api/users', users);

const drivers = require('./routes/driver');
app.use('/api/drivers', drivers);

const vehicles = require('./routes/vehicle');
app.use('/api/vehicles', vehicles);

app.use((err, req, res, next) => {
    return res.status(500).json({ errors: err });
});