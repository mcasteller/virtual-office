const passportGoogle = require ( 'passport-google-oauth' );
const _ = require ( 'lodash' );
const async = require ( 'async' );
const { logger } = require( '../logger' );
const User = require( '../../modules/users/users.model' );
const Role = require( '../../modules/roles/roles.model' );

const GoogleStrategy = passportGoogle.OAuth2Strategy

const strategy = ( demo ) => {

  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${ process.env.SERVER_API_URL }/auth/google/callback`,
    passReqToCallback: true
  }

  const verifyCallback = async (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {

    const username = profile.displayName.replace( / /g, '' );

    User.findOne( { username }, function ( err, user ) {
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
          if ( err ) return done( err );

          logger.info(
            "Google Strategy: User successfully created",
            results.user
          )

          return done( null, results.user )
        } )
      }
    } );

    async function defineUser () {
      const user = new User( {
        provider: profile.provider,
        username: profile.displayName.replace( / /g, '' ),
        email: profile.emails.length ? _.first( profile.emails ).value : '',
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      } )

      return user;
    }

    async function assignRole ( result ) {
      const { user } = result;

      const res = await Role
        .find( { code: 'admin' } )
        .exec();

      const adminRole = _.first( res );

      if ( !adminRole ) {
        logger.warn( 'Google Strategy: No adminRole available' )
        return null;
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
