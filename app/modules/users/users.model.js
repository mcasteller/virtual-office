'use strict';

/**
 * Module dependencies
 */
const mongoose = require( 'mongoose' ),
  path = require( 'path' ),
  config = require( path.resolve( './config/config' ) ),
  Schema = mongoose.Schema;
const _ = require( 'lodash' );
/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

const validateUsername = function ( username ) {
  const usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
  return (
    this.provider !== 'local' ||
    ( username && usernameRegex.test( username ) && config.illegalUsernames.indexOf( username ) < 0 )
  );
};

/**
 * User Schema
 */
const UserSchema = new Schema( {
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  displayName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: ''
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    validate: [ validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.' ],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  profileImageURL: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: [ 'user', 'admin' ]
    }],
    default: [ 'user' ],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
} );

// Virtual Fields
UserSchema.virtual( 'isAdmin' )
  .get( function () {
    return _.includes( this.roles, 'admin' )
  } )

// /**
//  * Hook a pre save method to hash the password
//  */
// UserSchema.pre( 'save', function ( next ) {
//   if ( this.password && this.isModified( 'password' ) ) {
//     this.salt = crypto.randomBytes( 16 ).toString( 'base64' );
//     this.password = this.hashPassword( this.password );
//   }

//   next();
// } );

// /**
//  * Hook a pre validate method to test the local password
//  */
// UserSchema.pre( 'validate', function ( next ) {
//   if ( this.provider === 'local' && this.password && this.isModified( 'password' ) ) {
//     const result = owasp.test( this.password );
//     if ( result.errors.length ) {
//       const error = result.errors.join( ' ' );
//       this.invalidate( 'password', error );
//     }
//   }

//   next();
// } );

/**
 * Find possible not used username
 */
// UserSchema.statics.findUniqueUsername = function ( username, suffix, callback ) {
//   const _this = this;
//   const possibleUsername = username.toLowerCase() + ( suffix || '' );

//   _this.findOne( {
//     username: possibleUsername
//   }, function ( err, user ) {
//     if ( !err ) {
//       if ( !user ) {
//         callback( possibleUsername );
//       } else {
//         return _this.findUniqueUsername( username, ( suffix || 0 ) + 1, callback );
//       }
//     } else {
//       callback( null );
//     }
//   } );
// };

module.exports = mongoose.model( 'User', UserSchema );
