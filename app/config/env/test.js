/* eslint-disable max-len */

'use strict';
const path = require( 'path' );

module.exports = {
  db: {
    host: 'localhost',
    dbname: 'virtualoffice-test'
  },
  logger: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT || 'combined',
    console: false,
    requests: false,
    mongo: false,
    file: false,
    slack: false,
    output: {
      default: {
        level: 'info',
        timestamp: true,
        handleExceptions: true
      },
      console: {
        level: 'debug',
        colorize: true,
        json: false,
        handleExceptions: true
      },
      file: {
        level: 'info',
        colorize: false,
        filename: path.join( process.cwd(), 'logs/all-logs.log' ),
        timestamp: true,
        maxsize: 5242880, //5MB
        maxFiles: 2,
        json: true,
        eol: '\n',
        tailable: true,
        showLevel: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      }
    }
  }
};
