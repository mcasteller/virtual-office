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

  const { standardConnectionURI, host, port, dbname } = config.db;

  try {
    const connectionURI = standardConnectionURI
      ? standardConnectionURI
      : `mongodb://${ host }:${ port }/${ dbname }`;

    logger.info(
      `Database: trying to connect to: ${ connectionURI }`
    )

    await mongoose.connect( connectionURI, options )

    if ( config.db.seed ) {
      seedDatabase.start();
    }

  } catch ( error ) {
    logger.error( 'Could not connect to MongoDB!', error );
  }

  mongoose.connection.on( 'open', () => {
    logger.info( `mongo connection opened (mongodb://${ host }:${ port }/${ dbname })` );
  } );

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
