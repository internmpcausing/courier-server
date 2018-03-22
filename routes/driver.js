const express = require('express');
const router = express.Router();

const logger = require('../util/logger');
const arrayWrap = require('../util/arraywrap');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Sanitizer, Validator
const Sanitize = require('./validations/sanitize');
const PersonValidation = require('./validations/person');
const AccountValidation = require('./validations/account');
const VehicleValidation = require('./validations/vehicle');
const { check, body, validationResult } = require('express-validator/check');

// models
const Account = require('../models/account');
const Driver = require('../models/driver');

router.post('/register', 
    Sanitize('firstName'),
    Sanitize('lastName'),
    Sanitize('address'),
    Sanitize('email'),
    Sanitize('phone'),
    Sanitize('vehicle.type'),
    Sanitize('vehicle.manufacturer'),
    Sanitize('vehicle.model'),
    Sanitize('vehicle.year'),
    Sanitize('vehicle.operator.firstName'),
    Sanitize('vehicle.operator.lastName'),
    Sanitize('vehicle.operator.phone'),
    Sanitize('username'),
    Sanitize('password'),
    PersonValidation.name('firstName'),
    PersonValidation.name('lastName'),
    PersonValidation.address('address'),
    PersonValidation.emailDriver('email'),
    PersonValidation.phone('phone'),
    AccountValidation.username('username'),
    AccountValidation.password('password'),
    VehicleValidation.type('vehicle.type'),
    VehicleValidation.manufacturer('vehicle.manufacturer'),
    VehicleValidation.model('vehicle.model'),
    VehicleValidation.year('vehicle.year'),
    VehicleValidation.plateNumber('vehicle.plateNumber'),
    PersonValidation.name('operator.firstName'),
    PersonValidation.name('operator.lastName'),
    PersonValidation.phone('operator.phone'),
    async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    let account = await Account.addNewDriver(req.body);
    req.body = Object.assign({}, req.body, {_id: account._id});
    let driver = await Driver.addNew(req.body);

    res.send({
        success: true
    });
    
})

router.post('/authenticate',
    Sanitize('username'),
    Sanitize('password'),
    async (req, res, next) => {
    let account = await Account.authenticate(req.body.username, req.body.password, 3);
    let response = {};
    if(account){
        response = Object.assign({}, {
            success: true,
            msg: 'You successfully logged in',
            token: jwt.sign(
                {data: {
                    _id: account._id
                }}, 
                config.secret,
                {expiresIn: 604800}
            )
        })
    }
    else{
        response = Object.assign({}, {
            success: false,
            msg: 'Your username or password is incorrect'
        })
    }

    res.send(response);
    
})


module.exports = router;
