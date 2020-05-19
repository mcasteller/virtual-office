const JwtStrategy = require( 'passport-jwt' ).Strategy
const mongoose = require( 'mongoose' );
const { logger } = require ( '../logger' );
const config = require( '../../config/config' );

const strategy = () => {

  const opts = {}

  // Tell passport to read JWT from cookies
  opts.jwtFromRequest = function ( req ) {
    let token = null;
    if ( req && req.cookies ){
      token = req.cookies[ 'jwt' ]
    }
    return token
  }
  opts.secretOrKey = config.jwt.secret;
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';

  return new JwtStrategy( opts, function ( jwt_payload, done ) {
    const User = mongoose.model( 'User' );

    const { email } = jwt_payload.data;
    User.findOne( { email }, function ( err, user ) {
      if ( err ) {
        logger.error( 'JWT Strategy error:', err );

        return done( err, false );
      }
      if ( user ) {
        return done( null, user );
      } else {
        // If user does not exists, we deny access
        return done( null, false );
      }
    } );
  } )
}

module.exports = strategy();
