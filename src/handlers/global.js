'use strict';

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
exports.homepage = (event, context, callback) => {
    callback(null, {
        statusCode: 302,
        headers: [
            'Location: https://mygov.org.nz/tools'
        ]
    });
};

/**
 * [handler description]
 *
 * @param  {*}        event    API Gateway HTTP event
 * @param  {*}        context  Lambda context
 * @param  {Function} callback Lambda response provider
 */
exports.tools = (event, context, callback) => {
    //
};
