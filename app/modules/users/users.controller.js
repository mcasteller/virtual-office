const jwt = require( 'jsonwebtoken' )
const { logger } = require( '../../lib/logger' );

module.exports.authenticate = ( req, res, next ) => {

  logger.info( 'User Route: authentication successfull' );

  const user = {
    name: req.user.username,
    email: req.user.email,
    displayName: req.user.displayName,
    provider: req.user.provider,
    roles: req.user.roles
  }

  // TODO: retrieve secret from config file
  const token = jwt.sign( {
    data: user
  }, 'secret', { expiresIn: '5d' } );

  res.cookie( 'jwt', token, { httpOnly: true } )

  res.redirect( '/dashboard' )
}

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

module.exports.logout = ( req, res, next ) => {

  const user = {
    name: req.user.username,
    email: req.user.email,
    displayName: req.user.displayName,
    provider: req.user.provider }

  logger.info( `User Route: authentication successfull for user: ${ user }` );

  res.json( user )
}
