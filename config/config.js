// module.exports.database = {uri: 'mongodb://intern1234:johnp@ds129422.mlab.com:29422/courier'}; //prod
module.exports.database = {uri: 'mongodb://localhost:27017/courier'}; //dev
module.exports.secret = 'johnp';



const _cloudinary  = require('cloudinary')
_cloudinary.config({ 
    cloud_name: 'dka3vzadb', 
    api_key: '259354488977965', 
    api_secret: 'zO8KRwUwA1A-zINxpKrkRO-CINs' 
});
module.exports.cloudinary = _cloudinary;
