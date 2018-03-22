const { buildSanitizeFunction } = require('express-validator/filter');
const sanitizeBody = buildSanitizeFunction(['body']);

module.exports = field => {
    return sanitizeBody(field).trim().escape();
}