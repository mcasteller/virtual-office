
const path = require( 'path' );
const { Router } = require( 'express' );
const router = Router();

const usersRouter = require( '../modules/users/users.routes' );

/**
 * Initialize application routes
 */
module.exports.initialize = function ( app ) {

  // Initi specific API endpoints
  usersRouter( app );

  app.use( '/', router );

  // Handles any requests that don't match the ones above
  router.get( '*', function ( req, res, next ) {
    res.sendFile( path.join( __dirname, '../public', 'index.html' ) );
  } );
}
