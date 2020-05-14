const createError = require( 'http-errors' );
const { logger }  = require( "./logger" );

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
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

    // include winston logging
    logger.error(
      `${ err.status || 500 } - ${ err.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`
    );

    // render the error page
    res.status( err.status || 500 );

    res.redirect( '/error' )
  } );
}
