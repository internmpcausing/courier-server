const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    location: {
        origin: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            },
            description: String
        },
        destination: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            },
            description: String
        },
        distance: {
            type: Number,
            required: true
        }
    },
    createdAt:{
        type: Number,
        required: true
    },
    extraService: {
        helper: {
            included: {
                type: Boolean,
                default: false
            },
            fare: {
                type: Number,
                required: true,
            },
            people: {
                type: Number
            }
        }
    },
    photos: [
        {
            original: String,
            thumb: String
        }
    ],
    sender: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        payment: {
            type: Boolean,
            default: false
        }
    },
    reciever: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        payment: {
            type: Boolean,
            default: false
        }
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        canceled: {
            type: Boolean,
            default: false
        },
        deleted: {
            type: Boolean,
            default: false
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
    

});

const Booking = module.exports =  mongoose.model('Booking', bookingSchema);