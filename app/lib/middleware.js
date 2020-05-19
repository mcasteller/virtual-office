const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const path = require( 'path' );
const Sentry = require ( '@sentry/node' );
const bodyParser = require( "body-parser" );

/**
 * Initialize application middleware
 */
module.exports.initialize = function ( app ) {
  Sentry.init( {
    dsn: 'https://d4c4df87c9914eeeb0a2d6d28cdb93a1@o387612.ingest.sentry.io/5223196'
  } );

  // The request handler must be the first middleware on the app
  app.use( Sentry.Handlers.requestHandler() );

  app.use( express.json() );
  app.use( express.urlencoded( { extended: false } ) );
  app.use( cookieParser() );
  app.use( bodyParser.urlencoded( { extended: false } ) );
  app.use( express.static( path.join( __dirname, '../public' ) ) );
}
