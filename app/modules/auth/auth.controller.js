const jwt = require( 'jsonwebtoken' )
const { logger } = require( '../../lib/logger' );
const config = require( '../../config/config' );

module.exports.authenticate = ( req, res, next ) => {

  const user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    roles: req.user.roles
  }

  const token = jwt.sign(
    { data: user }, config.jwt.secret, { expiresIn: '5d' }
  );

  res.cookie( 'jwt', token, { httpOnly: true } )

  res.redirect( 'back' )
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
