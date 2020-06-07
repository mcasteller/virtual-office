const createError = require( 'http-errors' );
const Sentry = require ( '@sentry/node' );
const { logger }  = require( "./logger" );
const sentry = require( '@sentry/node' );

/**
 * Configure error handling
 */
module.exports.initialize = function ( app ) {

  // catch 404 and forward to error handler
  app.use( function ( req, res, next ) {
    next( createError( 404 ) );
  } );

  // error handler
  app.use( function ( err, req, res, next ) {
    // The error handler must be before any other error middleware
    // and after all controllers
    app.use( Sentry.Handlers.errorHandler() );

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // include winston logging
    logger.error(
      `${ err.status || 500 } - ${ err.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`
    );

    if ( sentry ) {
      sentry.captureException( err );
    }

    // render the error page
    res.status( err.status || 500 );

    res.format( {
      text () {
        res.send( err.message );
      },

      html () {
        res.redirect( '/error' );
      },

      json () {
        res.json( {
          err
        } );
      }
    } );
  } );
}
