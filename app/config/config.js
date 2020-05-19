const path = require( 'path' );
const fs = require( 'fs' );
const _ = require( 'lodash' );

/**
 * Initialize global configuration
 */
const initGlobalConfig = function () {

  // Get the default config
  const defaultConfig = require(
    path.join( process.cwd(), '/config/env/default' )
  );

  console.log( 'config', process.cwd(), '/config/env/', process.env.NODE_ENV )
  // Get the current config
  const environmentConfig = require(
    path.join( process.cwd(), '/config/env/', process.env.NODE_ENV )
  ) || {};

  // Merge config files
  let config = _.merge( defaultConfig, environmentConfig );

  // Extend the config object with the local-NODE_ENV.js
  // custom/local environment.
  // This will override any settings present in the local configuration.
  config = _.merge( config, (
    fs.existsSync( path.join(
      process.cwd(),
      'config/env/local-' + process.env.NODE_ENV + '.js' ) )
    &&
    require( path.join(
      process.cwd(),
      'config/env/local-' + process.env.NODE_ENV + '.js' )
    )
  ) || {} );

  return config;
}

module.exports = initGlobalConfig();
