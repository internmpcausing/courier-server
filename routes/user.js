const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');
const arrayWrap = require('../util/arraywrap');
const Account = require('../models/account');
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/register',
    [body('username')
        .exists().withMessage('username is required')
        .trim()
        .isLength({min: 6}).withMessage('username must be at least 6 characters')
        .custom(value => {
            return Account.findByQuery({username: value}).then(account => {
                if(account) throw new Error('this username is already in use');
            })
        }),
    body('password')
        .exists().withMessage('password is required')
        .trim()
        .isLength({min: 6}).withMessage('password must be at least 6 characters'),
    body('email')
        .exists().withMessage('email is required')
        .trim()
        .isEmail().withMessage('must be an email')
        .custom(value => {
            return User.findByQuery({email: value}).then(user => {
                if(user) throw new Error('this email is already in use');
            })
        }),
    body('firstName')
        .exists().withMessage('firstname is required')
        .trim()
        .isLength({min: 2}).withMessage('firstname must be at least 2 characters'),
    body('lastName')
        .exists().withMessage('lastname is required')
        .trim()
        .isLength({min: 2}).withMessage('firstname must be at least 2 characters'),
    body('phone')
        .exists().withMessage('phone is required')
        .trim()
        .custom(value => {
            return User.findByQuery({phone: value}).then(user => {
                if(user) throw new Error('this phone is already in use');
            })
        }),
    ],
    async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    let account = await Account.addNewUser(req.body);
    req.body = Object.assign({}, req.body, {_id: account._id});
    let user = await User.addNew(req.body);
    
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
