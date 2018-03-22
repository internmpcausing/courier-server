const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');
const arrayWrap = require('../util/arraywrap');
const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const { check, body, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/create',
    async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    
    // Vehicle.addNew(req.body);
    
    res.send({
        success: true
    });
})




module.exports = router;
