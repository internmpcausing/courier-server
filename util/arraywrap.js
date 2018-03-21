const _arrayWrap = require("arraywrap");

module.exports = (q) => {
    let value = _arrayWrap(q || '')
    return value[0];
}