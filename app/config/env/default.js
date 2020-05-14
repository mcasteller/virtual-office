/* eslint-disable max-len */

'use strict';
const path = require( 'path' );

module.exports = {

  db: {
    host: 'mongo',
    port: 27017,
    options: {},
    debug: false,
    // faster - don't perform 2nd request to verify
    // log message was received/saved
    safe: false,
    dbname: 'expressmongo'
  },
  logger: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: process.env.LOG_FORMAT || 'combined',
    console: true,
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
  },
  session: {
    secret: 'myproject',
    cookie: {
      // session expiration is set by default to 24 hours
      maxAge: 24 * ( 60 * 60 * 1000 ),
      // httpOnly flag makes sure the cookie is only accessed
      // through the HTTP protocol and not JS/browser
      httpOnly: true,
      // secure cookie should be turned to true to provide additional
      // layer of security so that the cookie is set only when working
      // in HTTPS mode.
      secure: false
    },
    resave: false,
    saveUninitialized: true
  },
  google: {
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID || '261404288404-556hbrioma1usbcphns9ktm1lgpppq2f.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET
  }

};
