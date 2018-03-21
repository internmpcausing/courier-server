const _ = require('lodash');
const log4js = require('log4js');
const _logger = log4js.getLogger();

_logger.trace(`Sample debug`);
_logger.debug(`Sample debug`);
_logger.info(`Sample debug`);
_logger.warn(`Sample debug`);
_logger.error(`Sample debug`);

_logger.level = 'debug';

function removeSpace(originalString){
    if(_.isObject(originalString)) {
        return `\n${originalString}\n`
    }

    let str = originalString.toString().split('\n');
    let newString = '';
    for(let s of str){
        newString += `${s.trim()}\n`;
    }
    return `\n${newString.trim()}\n`
}


module.exports = {
    trace: str => {
        return _logger.trace(removeSpace(str))
    },
    debug: str => {
        return _logger.debug(removeSpace(str))
    },
    info: str => {
        return _logger.info(removeSpace(str))
    },
    warn: str => {
        return _logger.warn(str)
    },
    error: str => {
        return _logger.error(str)
    },
}
