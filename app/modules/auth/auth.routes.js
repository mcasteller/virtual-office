const { Router } = require( 'express' );
const router = Router();
const passport = require ( 'passport' );
const controller = require( './auth.controller' );
const { logger } = require( '../../lib/logger' );

module.exports = ( app ) => {

  app.use(
    '/api/auth/google',
    router
  );

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  router.get(
    '/',
    passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } )
  );

  router.get(
    '/callback',
    passport.authenticate( 'google', { scope: [ 'profile', 'email' ] } ),
    controller.authenticate
  );
}
