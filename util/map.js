const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDM5PgJpZNIhEGRO94N9GlMGJnmTQiHTUw',
    Promise: Promise // 'Promise' is the native constructor.
  });

module.exports.directions = async (origin, destination) => {
    const directions  = await  googleMapsClient.directions({origin: origin, destination: destination}).asPromise();
    let leg = directions.json.routes[0].legs[0];
    let result = {
        origin: origin,
        destination: destination,
        distance: leg.distance,
        duration: leg.duration,
        steps: []
    }
    for(let step of leg.steps){
        result.steps.push(step.start_location);
        result.steps.push(step.end_location);
    }
    return result;
}

module.exports.placesAutoComplete = async (input) => {
    const places  = await  googleMapsClient.placesAutoComplete({input: input}).asPromise();
    // console.log(places.json.predictions);
    let predictions = places.json.predictions
    let results = [];
    for(let p of predictions){
        results.push({
            description: p.description,
            place_id: p.place_id
        })
    }
    return results;
}

module.exports.place = async (placeid) => {
    const place  = await  googleMapsClient.place({placeid: placeid}).asPromise();
    console.log(place);
    let result = place.json.result
    result = Object.assign({}, {
        description: result.formatted_address,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
    })
    return result;
}