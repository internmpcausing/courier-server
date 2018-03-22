const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
const logger = require('../util/logger');
const hash = require('../util/hash');

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true
    },
    name: {
        firstName: String,
        lastName: String,
    },
    pic: {
        original: {
            type: String,
            default: ''
        },
        thumb: {
            type: String,
            default: ''
        },
    },
    createdAt:{
        type: Number
    },
    updatedAt: {
        type: Number,
        default: 0
    },
    deleted:{
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    type: {
        type: Number,
        required: true
    }
});

const Account = module.exports =  mongoose.model('Account', accountSchema);


module.exports.addNewUser = async (req) => {
    let account = new Account({
        username: req.username,
        password:  await hash(req.password),
        createdAt: (new Date).getTime(),
        verified: true,
        type: 4
    });
    return account.save();
}

module.exports.addNewDriver = async (req) => {
    let account = new Account({
        username: req.username,
        password:  await hash(req.password),
        createdAt: (new Date).getTime(),
        verified: true,
        type: 3
    });
    return account.save();
}

module.exports.findByQuery = query => {
   return Account.findOne(query).exec();
}

module.exports.authenticate = async (username, password, type) => {
    let account = await Account.findOne({username: username, type: type, verified: true}).exec();
    if(!account) return false;

    let isMatch = await bcrypt.compare(password, account.password);
    return isMatch ? account : false;
}