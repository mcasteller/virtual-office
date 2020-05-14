'use strict';

/**
 * Module dependencies.
 */
const _ = require( 'lodash' ),
  config = require( '../config/config' ),
  mongoose = require( 'mongoose' );
const sentry = require( '@sentry/node' );
const seedDatabase = require( './mongo-seed' );
const { logger } = require( './logger' );

// Initialize Mongoose
module.exports.initDatabase = async function () {

  const options = _.merge( config.db.options || {} );

  try {
    // .connect( config.db.uri, options )

    await mongoose.connect( 'mongodb://mongo:27017/expressmongo', options )

    seedDatabase.start();

  } catch ( error ) {
    logger.error( 'Could not connect to MongoDB!', error );
  }

  // Error handler for post connection error messages
  mongoose.connection.on( 'error', ( error ) => {
    logger.error( 'Could not connect to MongoDB!', error );

    if ( sentry ) {
      sentry.captureException( error );
    }
  } )
}

// module.exports.disconnect = function ( cb ) {
//   mongoose.connection.db
//     .close( function ( err ) {
//       logger.info( 'Disconnected from MongoDB.' );
//       return cb( err );
//     } );
// };
