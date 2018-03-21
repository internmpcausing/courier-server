const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
const logger = require('../util/logger');

const userSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            firstName: {
                type: String,
                require: true
            },
            lastName: {
                type: String,
                require: true
            },
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: Number,
            require: true
        },
        business: String
});

const User = module.exports =  mongoose.model('User', userSchema);

module.exports.addNew = (req) => {
    let user = new User({
        _id: ObjectId(req._id),
        name: {
            firstName: req.firstName,
            lastName: req.lastName
        },
        email: req.email,
        phone: req.phone,
        business: req.business ? req.business : ''
    });
    return user.save();
}

module.exports.findByQuery = query => {
    return User.findOne(query).exec();
 }