/**
 * Created by jun.li on 10/29.
 */

var log4js = require('../lib/log4js');

const SEQ = '\n';
const DEFAULT_CONFIG = {
    "appenders": [
        {
            "type": "console"
        },
        {
            "type": "dateFile",
            "absolute": false,
            "filename": "logs/log",
            "maxLogSize": 1024,
            "backup": 3,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "category": "-"
        }
    ],
    "levels": {
        "-": "trace"
    },
    "replaceConsole": false
};

function Log(log4js_config) {
    var config = log4js_config || DEFAULT_CONFIG;
    log4js.configure(config);

    var logger = function (config) {
        var logger = log4js.getLogger('-');
        logger.setLevel(config.levels['-'] || 'TRACE');
        return logger;
    }(config);

    var getStack = function () {
        var sta = new Error().stack;
        if (typeof sta == 'undefined') {
            return 'no stack1';
        }
        var sts = sta.split('\n');
        if (typeof sts == 'undefined' || sts.length < 4) {
            return 'no stack2';
        }
        return sts[3].trim();
    };

    return {
        trace: function (msg) {
            logger.trace(getStack() + SEQ + msg);
        },
        debug: function (msg) {
            logger.debug(getStack() + SEQ + msg);
        },
        info: function (msg) {
            logger.info(getStack() + SEQ + msg);
        },
        warn: function (msg) {
            logger.warn(getStack() + SEQ + msg);
        },
        error: function (msg) {
            logger.error(getStack() + SEQ + msg);
        },
        fatal: function (msg) {
            logger.fatal(getStack() + SEQ + msg);
        },
        traceObj: function (msg, obj) {
            logger.trace(getStack() + SEQ + (msg || ''));
            logger.trace(obj);
        },
        errorObj: function (msg, obj) {
            logger.error(getStack() + SEQ + (msg || ''));
            logger.error(obj);
        },
        fatalObj: function (msg, obj) {
            logger.fatal(getStack() + SEQ + (msg || ''));
            logger.fatal(obj);
        }
    };
}

module.exports = Log;
