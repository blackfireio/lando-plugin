'use strict';

// Modules
const _ = require('lodash');
const utils = require('./../../lib/utils');

// Builder
module.exports = {
    name: 'blackfire',
    config: {
        version: '2',
        supported: ['2'],
        server_id: '',
        server_token: '',
        client_id: '',
        client_token: '',
        log_level: '1',
        port: '8307',
        meUser: 'blackfire', // Ensure to use the appropriate user within the container.
    },
    parent: '_service',
    builder: (parent, config) => class LandoBlackfire extends parent {
        constructor(id, options = {}) {
            options = _.merge({}, config, options);

            // Ensure that the credentials are correctly set.
            _.forEach(['server_id', 'server_token', 'client_id', 'client_token'], function (value) {
                if (!options[value]) {
                    throw Error(`Blackfire credentials must be configured in your LandoFile. "${value}" is missing.`);
                }
            });

            // Define the Blackfire service.
            const blackfire = {
                image: `blackfire/blackfire:${options.version}`,
                command: '/usr/local/bin/entrypoint.sh blackfire agent:start',
                environment: {
                    BLACKFIRE_SERVER_ID: options.server_id,
                    BLACKFIRE_SERVER_TOKEN: options.server_token,
                    BLACKFIRE_CLIENT_ID: options.client_id,
                    BLACKFIRE_CLIENT_TOKEN: options.client_token,
                    BLACKFIRE_LOG_LEVEL: options.log_level,
                },
            };

            // Add necessary steps to the app container to install blackfire CLI and the PHP probe.
            utils.addBuildStep(['wget -q -O - https://packages.blackfire.io/gpg.key | apt-key add -'], options._app, 'appserver', 'build_as_root_internal');
            utils.addBuildStep(['echo "deb http://packages.blackfire.io/debian any main" | tee /etc/apt/sources.list.d/blackfire.list'], options._app, 'appserver', 'build_as_root_internal');
            utils.addBuildStep(['apt update -y'], options._app, 'appserver', 'build_as_root_internal');
            utils.addBuildStep(['apt install blackfire-php blackfire'], options._app, 'appserver', 'build_as_root_internal');

            // Send it downstream
            super(id, options, {services: _.set({}, options.name, blackfire)});
        };
    },
};
