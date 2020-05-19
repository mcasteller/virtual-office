
const path = require( 'path' );
const { Router } = require( 'express' );
const router = Router();
const { logger } = require( '../lib/logger' );
const usersRouter = require( '../modules/users/users.routes' );
const authRouter = require( '../modules/auth/auth.routes' );

/**
 * Initialize application routes
 */
module.exports.initialize = function ( app ) {

  logger.info( 'User Routes: initializing' )

  // Initi specific API endpoints
  usersRouter( app );
  authRouter( app );

  app.use( '/', router );

  // Handles any requests that don't match the ones above
  router.get( '*', function ( req, res, next ) {
    res.sendFile( path.join( __dirname, '../public', 'index.html' ) );
  } );
}
