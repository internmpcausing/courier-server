const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const vehicleSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    fare: {
        firstThreeKm: {
            type: Number,
            required: true
        },
        afterwards: {
            type: Number,
            required: true
        }
    }
});

const Vehicle = module.exports =  mongoose.model('Vehicle', vehicleSchema);


module.exports.addNew = async (req) => {
    let vehicle = new Vehicle({
        description: req.description,
        fare: {
            firstThreeKm: req.fare.firstThreeKm,
            afterwards: req.fare.afterwards
        }
    });
    return vehicle.save();
}

module.exports.findByQuery = query => {
   return Vehicle.findOne(query).exec();
}