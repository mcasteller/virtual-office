'use strict';

const async = require( 'async' );
const Role = require( '../modules/roles/roles.model' );
const { logger } = require( './logger' );

function start () {

  const initialRoles = [
    {
      code: 'admin',
      name: 'Admin',
      description: 'Admin have access to all restricted paths',
      userEmails: [
        process.env.ADMIN_EMAIL
      ]
    }
  ]

  async.mapSeries( initialRoles,
    ( role, cb ) => Role.create( role, cb ),
    ( err, results ) => {
      if ( err ) {
        logger.error( 'Seed Error', err )
      }
      return null;
    } );
}

module.exports = { start }
