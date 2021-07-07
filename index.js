'use strict';

module.exports = lando => {
    // Log that this plugin has loaded
    lando.events.on('post-bootstrap-config', () => {
        lando.log.debug('Blackfire plugin loaded!');
    });

    // Merge some stuff into the lando object and its config
    return {};
};
