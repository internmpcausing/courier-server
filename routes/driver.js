const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');
const Validation = require('../util/validation');
const arrayWrap = require('../util/arraywrap');
const Account = require('../models/account');
const Driver = require('../models/driver');
const { check, body, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/register', 
    Validation.firstName,
    Validation.lastName,
    Validation.address,
    Validation.emailDriver,
    Validation.phone,
    Validation.username,
    Validation.password,
    Validation.vehicle.type,
    Validation.vehicle.manufacturer,
    
    async (req, res, next) => {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    res.send({
        success: true
    });
    
})


router.post('/authenticate',
    [body('username')
        .exists().withMessage('username is required')
        .trim()
        .isLength({min: 1}).withMessage('username is required'),
    body('password')
        .exists().withMessage('password is required')
        .trim()
        .isLength({min: 1}).withMessage('password is required')
    ],
    async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

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
