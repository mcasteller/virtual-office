const passportGoogle = require ( 'passport-google-oauth' );
const _ = require ( 'lodash' );
const assert = require( 'assert' ).strict;
const async = require ( 'async' );
const { logger } = require( '../logger' );
const User = require( '../../modules/users/users.model' );
const Role = require( '../../modules/roles/roles.model' );

const GoogleStrategy = passportGoogle.OAuth2Strategy

let verifyCallback;

const strategy = ( demo ) => {

  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${ process.env.SERVER_API_URL }/auth/google/callback`,
    passReqToCallback: true
  }

  /*  Executes done(err, user) callback
  **
  **  Validation:
  **  - succed: setup user variable that will make user
  **  variable to be available on req.user
  **
  **  - fails: set up err variable with Error Object that
  **  will throw an exeption captured by express error-handler.
  */
  verifyCallback = async (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {

    // Check required parameters
    if( _.isUndefined( profile.id )
      || _.isEmpty( profile.id ) ) {
      return done( new Error( 'profile id is missing' ), false );
    }

    const providerId = profile.id;

    User.findOne( { providerId }, function ( err, user ) {
      if ( err ) {
        logger.error( 'Google Strategy - Error:', err );

        return done( err, false );
      }
      if ( user ) {
        return done( null, user );
      } else {

        // Create new User
        async.auto( {
          user: defineUser,
          assign: [ 'user', assignRole ],
          save: [ 'assign', saveUser ]
        }, ( err, results ) => {
          if ( err ) return done( err, false );

          logger.info(
            "Google Strategy: User successfully created",
            results.user
          )

          return done( null, results.user )
        } )
      }
    } );

    async function defineUser () {

      // Check required parameters
      if( _.isUndefined( profile.name.givenName )
      || _.isEmpty( profile.name.givenName ) ) {
        return done( new Error( 'profile givenName is missing' ), false );
      }

      if( _.isUndefined( profile.name.familyName )
      || _.isEmpty( profile.name.familyName ) ) {
        return done( new Error( 'profile familyName is missing' ), false );
      }

      if( _.isUndefined( profile.emails )
      || _.isEmpty( profile.emails ) ) {
        return done( new Error( 'profile email is missing' ), false );
      }

      const user = new User( {
        provider: profile.provider,
        providerId: profile.id,
        email: profile.emails.length ? _.first( profile.emails ).value : '',
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      } )

      return user;
    }

    async function assignRole ( result ) {
      const { user } = result;

      let res;
      try {
        res = await Role
          .find( { code: 'admin' } )
          .exec();
      } catch( e ) {
        logger.error( `Google Strategy - Error: ${ e }` )
        return user;
      }

      const adminRole = _.first( res );

      if ( !adminRole ) {
        logger.error( `Google Strategy - Error: No adminRole available, user ${ user.displayName } could not be assigned to admin role` );
        return user;
      }

      const isAdmin = _.indexOf( adminRole.userEmails, user.email ) !== -1;

      // If user matches admins, make them admins instantly
      if ( isAdmin ) {
        user.roles.push( adminRole.code );
      }

      return user;
    }

    async function saveUser ( result ) {
      const { user } = result;

      return user.save()
    }

  }

  return new GoogleStrategy( strategyOptions, verifyCallback );
}

module.exports = strategy();

module.exports.verifyCallback = verifyCallback; // test purpose
