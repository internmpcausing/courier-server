const express = require('express');
const router = express.Router();
const Map = require('../util/map');
const logger = require('../util/logger');


router.get('/directions', (req, res, next) => {

    if(req.query.origin && req.query.destination){
        Map.directions(req.query.origin, req.query.destination)
        .then(result => {
            console.log(result)
            logger.debug(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send();
        })
    }
    else{
        res.json({
            success: false,
            msg: 'Invalid origin or destination'
        })
    }
})


router.get('/place/autocomplete', (req, res, next) => {
    if(req.query.input){
        Map.placesAutoComplete(req.query.input)
        .then(result => {
         //   logger.debug(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);      
            res.status(500);
            res.send();
        })
    }
    else{
        res.status(500);
        res.json({
            success: false,
            msg: 'Invalid origin or destination'
        })
    }
})

router.get('/place', (req, res, next) => {
    if(req.query.placeid){
        Map.place(req.query.placeid)
        .then(result => {
         //   logger.debug(result);
            res.json(result);
        })
        .catch(err => {
            console.log(err);      
            res.status(500);
            res.send();
        })
    }
    else{
        res.status(500);
        res.json({
            success: false,
            msg: 'Invalid origin or destination'
        })
    }
})

module.exports = router;
