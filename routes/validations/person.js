const { check, body, validationResult } = require('express-validator/check');
const User = require('../../models/user');
const Driver = require('../../models/driver');

module.exports.name = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage(`${field} is required`)
    .isLength({min: 2}).withMessage(`${field} must be at least 2 characters`);
}

module.exports.address = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage(`${field} is required`)
    .isLength({min: 3}).withMessage(`${field} must be at least 3 characters`);
}
    
module.exports.emailUser = field => {
    return body(field)
    .not().matches(/\s/m).withMessage('whitespace on email is not allowed')
    .not().isEmpty().withMessage('email is required')
    .isEmail().withMessage('must be an email')
    .custom(value => {
        return User.findByQuery({email: value}).then(user => {
            if(user) throw new Error('this email is already in use');
        })
    });
}

module.exports.emailDriver = field => {
    return body(field)
    .not().matches(/\s/m).withMessage('whitespace on email is not allowed')
    .not().isEmpty().withMessage('email is required')
    .isEmail().withMessage('must be an email')
    .custom(value => {
        return Driver.findByQuery({email: value}).then(driver => {
            if(driver) throw new Error('this email is already in use');
        })
    });
}
    

module.exports.phone = field => {
    return body(field)
    .not().isEmpty().withMessage('phone is required')
    .matches(/^(09|\+639)\d{9}$/).withMessage('must be a valid phone number')
}
    



