const { check, body, validationResult } = require('express-validator/check');
const Vehicle = require('../../models/vehicle');
const ObjectId = require('mongodb').ObjectID;
// module.exports.vehicle = {
//     type: body('vehicle.type')
//         .exists().withMessage('vehicle type is required')
//         .trim()
//         .not().isEmpty().withMessage('vehicle type is required'),

//     manufacturer: body('vehicle.manufacturer')
//         .exists().withMessage('vehicle manufacturer is required')
//         .trim()
//         .not().isEmpty().withMessage('vehicle manufacturer is required'),

//     description: body('vehicle.description')
//         .exists().withMessage('vehicle description is required')
//         .trim()
//         .not().isEmpty().withMessage('vehicle description is required'),

//     firstThreeKm: body('vehicle.fare.firstThreeKm')
//         .trim()
//         .not().isEmpty().withMessage('vehicle fare for first 3 kilometer is required'),

//     description: body('vehicle.description')
//         .exists().withMessage('vehicle description is required')
//         .trim()
//         .not().isEmpty().withMessage('vehicle description is required'),
// }

module.exports.type = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage('vehicle type is required')
    .custom(value => {
        return Vehicle.findByQuery({_id: ObjectId(value)}).then(vehicle => {
            if(!vehicle) throw new Error('invalid vehicle type');
        })
    });
}

module.exports.manufacturer = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage('vehicle manufacturer is required')
}

module.exports.model = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage('vehicle model is required')
}

module.exports.year = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage('vehicle year is required')
}

module.exports.plateNumber = field => {
    return body(field)
    .trim()
    .not().isEmpty().withMessage('vehicle plate number is required')
}