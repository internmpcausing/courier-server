const bcrypt = require('bcryptjs');



module.exports = async (pass) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pass, salt);
    return hash;
}