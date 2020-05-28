/* eslint-disable max-len */

'use strict';
const path = require( 'path' );

module.exports = {

  db: {
    standardConnectionURI: process.env.MONGODB_URI || '',
    options: {},
    debug: false,
    // faster - don't perform 2nd request to verify
    // log message was received/saved
    safe: false,
    seed: true
  }
}
