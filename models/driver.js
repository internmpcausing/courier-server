const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
const logger = require('../util/logger');

const driverSchema = new Schema({
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
        address: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            require: true
        },
        vehicle: {
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Vehicle',
                required: true
            },
            manufacturer: {
                type: String,
                required: true
            },
            model: {
                type: String,
                required: true
            },
            year: {
                type: String,
                required: true
            },
            plateNumber: {
                type: String,
                required: true
            },
        },
        operator: {
            name: {
                lastName: {
                    type: String,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                }
            },
            phone: {
                type: String,
                require: true
            },
        }
});

const Driver = module.exports =  mongoose.model('Driver', driverSchema);

module.exports.addNew = (req) => {

    let driver = new Driver({
        _id: ObjectId(req._id),
        name: {
            firstName: req.firstName,
            lastName: req.lastName,
        },
        address: req.address,
        email: req.email,
        phone: req.phone,
        vehicle: {
            type: ObjectId(req.vehicle.type),
            manufacturer: req.vehicle.manufacturer,
            model: req.vehicle.model,
            year: req.vehicle.year,
            plateNumber: req.vehicle.plateNumber
        },
        operator: {
            name: {
                firstName: req.operator.firstName,
                lastName: req.operator.lastName
            },
            phone: req.operator.phone
        }
    });
    return driver.save();
}

module.exports.findByQuery = query => {
    return Driver.findOne(query).exec();
 }