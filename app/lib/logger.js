
const winston = require( 'winston' );
const fs = require( 'fs' );
const _ = require( 'lodash' );

const config = require( '../config/config' );

/**
* Initialize winston logger
*/
const logger = new winston.createLogger( {
  transports: _createTransports(),
  exitOnError: false
} )

// Define a stream function that will be able to
// get morgan-generated output into the winston log files
logger.stream = {
  write: function ( message ){
    logger.info( message );
  }
};

/**
 * The options to use with morgan logger
 *
 * Returns a log.options object with a writable stream based on winston
 * file logging transport (if available)
 */
logger.getMorganOptions = function getMorganOptions () {
  return {
    stream: logger.stream
  };
};

/**
 * The format to use with the logger
 *
 * Returns the log.format option set in the current environment configuration
 */
logger.getLogFormat = function getLogFormat () {
  let format = config.log
    && config.log.format ? config.log.format.toString() : 'combined';

  // list of valid formats for the logging
  const validFormats = [ 'combined', 'common', 'dev', 'short', 'tiny' ];

  // make sure we have a valid format
  if ( !_.includes( validFormats, format ) ) {
    format = 'combined';
  }

  return format;
};

logger.info( "Logger set up completed" )

function _createTransports () {
  const transports = [];

  if ( !_.has( config, 'logger' ) ) {
    throw new Error( 'Logger setup: config did not have a `logger` object' );
  }

  if ( !_.has( config, 'logger.output.default' ) ) {
    throw new Error(
      'Logger setup: config did not have a `logger.output.default` object'
    );
  }

  const output = config.logger.output;

  if ( config.logger.console ) {
    const winstonConsoleOpts = _.merge( output.default, output.console ) ;
    transports.push( new winston.transports.Console( winstonConsoleOpts ) );
  }

  // TODO: add this one at the time we set up MongoDb connection
  // if ( config.logger.mongo ) {
  //   const winstonMongoOpts =_.merge( output.default, output.mongo );
  //   transports.push( new winstonMongoDB.MongoDB( winstonMongoOpts ) );
  // }

  if ( config.logger.file ) {
    const winstonFileOpts = _.merge( output.default, output.file );
    transports.push( new winston.transports.File( winstonFileOpts ) );
  }

  if ( !transports.length ) {
    throw new Error( 'Logger setup: No log trasnport were found' );
  }
  return transports;
}

module.exports = { logger }
