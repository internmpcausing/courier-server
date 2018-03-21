const { check, body, validationResult } = require('express-validator/check');
const Account = require('../models/account');
const Driver = require('../models/driver');

module.exports.firstName = 
    body('firstName')
    .exists().withMessage('firstname is required')
    .trim()
    .isLength({min: 2}).withMessage('firstname must be at least 2 characters');

module.exports.lastName = 
    body('lastName')
    .exists().withMessage('lastname is required')
    .trim()
    .isLength({min: 2}).withMessage('lastname must be at least 2 characters');

module.exports.address = 
    body('address')
    .exists().withMessage('address is required')
    .trim()
    .isLength({min: 2}).withMessage('address must be at least 2 characters');

module.exports.emailDriver =
    body('email')
    .exists().withMessage('email is required')
    .not().matches(/\s/m).withMessage('whitespace on email is not allowed')
    .isEmail().withMessage('must be an email')
    .custom(value => {
        return Driver.findByQuery({email: value}).then(driver => {
            if(driver) throw new Error('this email is already in use');
        })
    });

module.exports.username = 
    body('username')
    .exists().withMessage('username is required')
    .isLength({min: 6}).withMessage('username must be at least 6 characters')
    .not().matches(/\s/m).withMessage('whitespace on username is not allowed')
    .custom(value => {
        return Account.findByQuery({username: value}).then(account => {
            if(account) throw new Error('this username is already in use');
        })
    });

module.exports.password =
    body('password')
    .exists().withMessage('password is required')
    .isLength({min: 6}).withMessage('password must be at least 6 characters')
    .not().matches(/\s/m).withMessage('whitespace on password is not allowed');

module.exports.phone = 
    body('phone')
    .exists().withMessage('phone is required')
    .trim()
    .custom(value => {
        return Driver.findByQuery({phone: value}).then(driver => {
            if(driver) throw new Error('this phone is already in use');
        })
    })

module.exports.vehicle = {
    type: body('vehicle.type')
        .exists().withMessage('vehicle type is required')
        .trim()
        .not().isEmpty().withMessage('vehicle type is required'),

    manufacturer: body('vehicle.manufacturer')
        .exists().withMessage('vehicle manufacturer is required')
        .trim()
        .not().isEmpty().withMessage('vehicle manufacturer is required'),

    description: body('vehicle.description')
        .exists().withMessage('vehicle description is required')
        .trim()
        .not().isEmpty().withMessage('vehicle description is required'),

    firstThreeKm: body('vehicle.fare.firstThreeKm')
        .trim()
        .not().isEmpty().withMessage('vehicle fare for first 3 kilometer is required'),

    description: body('vehicle.description')
        .exists().withMessage('vehicle description is required')
        .trim()
        .not().isEmpty().withMessage('vehicle description is required'),
}
    