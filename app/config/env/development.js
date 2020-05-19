/* eslint-disable max-len */

'use strict';

module.exports = {
  db: {
    dbname: 'virtualoffice-dev'
  },
  logger: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT || 'combined',
    console: true,
    requests: false,
    mongo: false,
    file: false,
    slack: false
  }

};
