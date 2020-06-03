const { Router } = require( 'express' );
const router = Router();
const passport = require ( 'passport' );
const controller = require( './users.controller' );
const { logger } = require( '../../lib/logger' );
const policies = require( '../../config/policies' );

module.exports = ( app ) => {

  app.use(
    '/api/users',
    passport.authenticate( 'jwt', { session: false } ),
    router
  );

  router.get(
    '/credentials',
    controller.getCredentials
  );

  router.get(
    '/',
    controller.getProfile
  );

  router.post(
    '/',
    controller.update
  );

  router.get( '/test',
    ( req, res, next ) => {
      policies.isAdmin,
      res.json( { user: 'pancho' } )
    } );

}
