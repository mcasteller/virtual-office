const passport = require( 'passport' );
const session = require( 'express-session' );

const googleStrategy = require ( './auth-strategies/google' );
const jwtStrategy = require ( './auth-strategies/jwt' );
const config = require( '../config/config' );
const { logger } = require( './logger' );

/**
 * Initialize passport.js
 */
module.exports.initialize = function ( app ) {

  logger.info( 'Session: initialize' );

  passport.serializeUser( function ( user, done ) {
    done( null, user.id );
  } );

  passport.deserializeUser( function ( id, done ) {
    done( null, id );
  } );

  // cookie-based session middleware.
  app.use( session( config.session ) );

  // add support for authentication
  app.use( passport.initialize() );

  // Used to persist login sessions
  app.use( passport.session() );

  passport.use( 'jwt', jwtStrategy );

  passport.use( 'google', googleStrategy )
}

