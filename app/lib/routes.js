
const path = require( 'path' );
const { OpenApiValidator } = require( 'express-openapi-validator' );
const { logger } = require( '../lib/logger' );
const errorRoutes = require( './error-routes.js' );
const usersRouter = require( '../modules/users/users.routes' );
const authRouter = require( '../modules/auth/auth.routes' );

const apiSpec = path.join( __dirname, '../openapi.yaml' );

/**
 * Initialize application routes
 */
module.exports.initialize = async function ( app ) {
  await new OpenApiValidator( {
    apiSpec,
    validateRequests: true, // (default)
    validateResponses: false // false by default
  } )
    .install( app )
    .then( _ => {
      logger.info( 'User Routes: initializing' )

      // Initi specific API endpoints
      usersRouter( app );
      authRouter( app );

      // Handles any requests that don't match the ones above
      app.get( '*', function ( req, res, next ) {
        res.sendFile( path.join( __dirname, '../public', 'index.html' ) );
      } );

      errorRoutes.initialize( app );
    } )
    .catch( e => {
      logger.error( `Error on user routes initialization: ${ e }` )
    } )
}
