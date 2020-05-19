const jwt = require( 'jsonwebtoken' )
const { logger } = require( '../../lib/logger' );
const config = require( '../../config/config' );

module.exports.getUser = ( req, res, next ) => {

  const user = {
    name: req.user.username,
    email: req.user.email,
    displayName: req.user.displayName,
    provider: req.user.provider,
    roles: req.user.roles,
    isAdmin: req.user.isAdmin
  }

  logger.info( `User Route: authentication successfull for user: ${ JSON.stringify( user ) }` );

  res.json( user )
}

