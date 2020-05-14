const async = require( 'async' );
const Sentry = require ( '@sentry/node' );
const morgan = require( 'morgan' );

const { logger } = require( './logger' );
const mongoose = require( './mongoose' );
const middleware = require( './middleware' );
const session = require( './session' );
const routes = require( './routes' );
const security = require( './security' );
const errorRoutes = require( './error-routes.js' );

/**
 * Initialize the Express application
 */

module.exports.initialize = ( app ) => {

  async.series( [
    initLogger,
    initDatabase,
    initMiddleware,
    initSession,
    initSecurity,
    initRoutes,
    initErrorRoutes
  ], ( err, res ) => {
    if ( err ) {
      return console.log( 'Error on app startup', err )
    }

    return app;
  } );

  async function initLogger () {
    app.use( morgan( logger.getLogFormat(), logger.getMorganOptions() ) );
  }

  async function initDatabase () {
    return mongoose.initDatabase()
  }

  async function initMiddleware () {
    middleware.initialize( app );
  }

  async function initSession () {
    session.initialize( app );
  }

  async function initSecurity () {
    security.initialize( app );
  }

  async function initRoutes () {
    routes.initialize( app )
  }

  async function initErrorRoutes () {
    // The error handler must be before any other error middleware
    // and after all controllers
    app.use( Sentry.Handlers.errorHandler() );

    errorRoutes.initialize( app );
  }
}
