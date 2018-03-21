const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');
const Validation = require('../util/validation');
const arrayWrap = require('../util/arraywrap');
const Account = require('../models/account');
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/create',
    Validation.firstThreeKm,
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




module.exports = router;
