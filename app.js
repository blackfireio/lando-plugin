'use strict';

// Modules
const _ = require('lodash');
const utils = require('./lib/utils');

module.exports = (app, lando) => {
    const blackfireServiceKey = _.findKey(app.config.services, ['type', 'blackfire']);
    if (blackfireServiceKey === undefined) {
        lando.log.info('No service of type "blackfire" is defined. Skipping Blackfire configuration.');

        return {};
    }

    const blackfireService = _.get(app.config.services, blackfireServiceKey);

    // Mix in some envvars and docker labels we want to add to all our containers
    return {
        env: {
            BLACKFIRE_CLIENT_ID: _.get(blackfireService, 'client_id', ''),
            BLACKFIRE_CLIENT_TOKEN: _.get(blackfireService, 'client_token', ''),
            BLACKFIRE_LOG_LEVEL: _.get(blackfireService, 'log_level', ''),
            BLACKFIRE_AGENT_SOCKET: _.get(blackfireService, 'agent_socket', `tcp://${blackfireServiceKey}:8307`),
        },
    };
};
