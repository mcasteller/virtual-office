// if ( process.env.NODE_ENV !== 'production' ) {
  const result = require( 'dotenv' ).config();

  if ( result.error ) {
    throw new Error( `Error loading environment variables: ${ result.error }` )
  }
// }

const express = require( 'express' );
const async = require( 'async' );
const morgan = require( 'morgan' );

const { logger } = require( './logger' );
const mongoose = require( './mongoose' );
const middleware = require( './middleware' );
const session = require( './session' );
const routes = require( './routes' );
const security = require( './security' );

/**
 * Initialize the Express application
 */

const initialize = () => {
  const app = express();

  async.series( [
    initLogger,
    initDatabase,
    initMiddleware,
    initSession,
    initSecurity,
    initRoutes
  ], ( err, res ) => {
    if ( err ) {
      return logger.error( 'Error on app startup', err )
    }

    logger.info( "App Initialization Complete" )
  } );

  return app;

  function initLogger ( cb ) {
    app.use( morgan( logger.getLogFormat(), logger.getMorganOptions() ) );
    cb();
  }

  function initDatabase ( cb ) {
    mongoose.initDatabase();
    cb();
  }

  function initMiddleware ( cb ) {
    middleware.initialize( app );
    cb()
  }

  function initSession ( cb ) {
    session.initialize( app );
    cb()
  }

  function initSecurity ( cb ) {
    security.initialize( app );
    cb()
  }

  function initRoutes ( cb ) {
    routes.initialize( app );
    cb()
  }
}

module.exports = { initialize }
