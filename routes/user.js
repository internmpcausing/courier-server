const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');
const arrayWrap = require('../util/arraywrap');
const Account = require('../models/account');
const User = require('../models/user');
const Sanitize = require('./validations/sanitize');
const PersonValidation = require('./validations/person');
const AccountValidation = require('./validations/account');
const { check, body, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/register',
    Sanitize('firstName'),
    Sanitize('lastName'),
    Sanitize('address'),
    Sanitize('email'),
    Sanitize('phone'),
    Sanitize('username'),
    Sanitize('password'),
    PersonValidation.name('firstName'),
    PersonValidation.name('lastName'),
    PersonValidation.address('address'),
    PersonValidation.emailUser('email'),
    PersonValidation.phone('phone'),
    AccountValidation.username('username'),
    AccountValidation.password('password'),
    async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body.lastName);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    let account = await Account.addNewUser(req.body);
    req.body = Object.assign({}, req.body, {_id: account._id});
    let user = await User.addNew(req.body);
    
    res.send({
        success: true
    });
    
})


router.post('/authenticate',
    Sanitize('username'),
    Sanitize('password'),
    async (req, res, next) => {

    let account = await Account.authenticate(req.body.username, req.body.password, 4);
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
