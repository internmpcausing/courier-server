const { check, body, validationResult } = require('express-validator/check');
const Account = require('../../models/account');


module.exports.username = field => {
    return body(field)
    .not().isEmpty().withMessage('username is required')
    .isLength({min: 6}).withMessage('username must be at least 6 characters')
    .not().matches(/\s/m).withMessage('whitespace on username is not allowed')
    .custom(value => {
        return Account.findByQuery({username: value}).then(account => {
            if(account) throw new Error('this username is already in use');
        })
    });
}
    

module.exports.password = field => {
    return body(field)
    .not().isEmpty().withMessage('password is required')
    .isLength({min: 6}).withMessage('password must be at least 6 characters')
    .not().matches(/\s/m).withMessage('whitespace on password is not allowed');
}
    

