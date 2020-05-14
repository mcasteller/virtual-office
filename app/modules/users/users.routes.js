const { Router } = require( 'express' );
const router = Router();
const passport = require ( 'passport' );
const controller = require( './users.controller' );
const { logger } = require( '../../lib/logger' );

module.exports = ( app ) => {

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  app.use( '/auth/google',
    passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ) );

  app.use( '/api/users', router );

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.
  router.get( '/auth/google/callback',
    passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ),
    controller.authenticate );

  // This url will only open, if the user is signed in
  router.get( '/profile',
    passport.authenticate( 'jwt', { session: false } ),
    controller.getUser );

  router.get( '/logout',
    passport.authenticate( 'jwt', { session: false } ),
    controller.logout );

}
