
// # tests - server

const request = require( 'supertest' );
const _ = require( 'lodash' );
const chai = require( 'chai' );
const sinon = require( 'sinon' );
const mongoose = require( 'mongoose' );
const sinonChai = require( 'sinon-chai' );
const expect = chai.expect;
chai.use( sinonChai );

const express = require( '../../lib/index' );
const { logger } = require( '../logger' );
const { verifyCallback } = require( './google' );

const User = require( '../../modules/users/users.model' );
const Role = require( '../../modules/roles/roles.model' );

describe( 'Authentication Strategies -> Google', function () {

  const USER_ROLE = 'user';

  let profile;

  before( function () {
    // Get application and open test db connection
    express.initialize();
  } );

  beforeEach( function () {
    profile = {
      provider: 'google',
      id: '4546545454544545',
      emails: [{ value: 'testemail@gmail.com' }],
      name: {
        givenName: 'John',
        familyName: 'Smith'
      }
    }
  } );

  it( 'verifyCallback -> if profile parameters are missing, an error message is available on callback function', function ( done ) {

    const callback = async ( error, user ) => {
      expect( error ).to.not.be.null;
      done();
    }

    // Undefine a profile value
    profile.id = undefined;

    // Execute callback function to verify functionality
    verifyCallback( request,
      null,
      null,
      profile,
      callback
    );
  } );

  it( 'verifyCallback -> if admin role is not defined on database it still returns user information AND log and error about it', function ( done ) {

    // Spy on logger function
    const spy = sinon.spy( logger, 'error' );

    const ERROR_MESSAGE = `Google Strategy - Error: No adminRole available, user ${ profile.name.givenName } ${ profile.name.familyName } could not be assigned to admin role`;

    const callback = async ( error, user ) => {
      if ( error ) {
        done( error )
      }

      let dbUser;
      try {
        dbUser = await User.findOne( { _id: user.id } )
      } catch( e ) {
        done( e )
      }

      expect( dbUser.firstName ).to.equal( profile.name.givenName );
      expect( dbUser.lastName ).to.equal( profile.name.familyName );
      expect( dbUser.email ).to.equal( _.first( profile.emails ).value );
      expect( dbUser.roles ).to.include( USER_ROLE );
      expect( dbUser.provider ).to.equal( profile.provider );
      expect( dbUser.providerId ).to.equal( profile.id );

      // This user was meant to be admin,
      // but due to missing role in DB, it is not
      expect( dbUser.isAdmin ).to.be.false;

      expect( spy ).to.have.been.calledWith( ERROR_MESSAGE );

      done();
    }

    // Execute callback function to verify functionality
    verifyCallback( request,
      null,
      null,
      profile,
      callback
    );
  } );

  it( 'verifyCallback -> first time ever login: creates user into database using data retrieved from google authentication and adding default role', function ( done ) {

    const callback = async ( error, user ) => {
      if ( error ) {
        done( error )
      }

      let dbUser;
      try {
        dbUser = await User.findOne( { _id: user.id } )
      } catch( e ) {
        done( e )
      }

      expect( dbUser.firstName ).to.equal( profile.name.givenName );
      expect( dbUser.lastName ).to.equal( profile.name.familyName );
      expect( dbUser.email ).to.equal( _.first( profile.emails ).value );
      expect( dbUser.roles ).to.include( USER_ROLE );
      expect( dbUser.provider ).to.equal( profile.provider );
      expect( dbUser.providerId ).to.equal( profile.id );
      expect( dbUser.isAdmin ).to.be.false;

      done();
    }

    // Execute callback function to verify functionality
    verifyCallback( request,
      null,
      null,
      profile,
      callback
    );
  } );

  it( 'GET google/callback -> assigns admin role based on configuration settings', function ( done ) {

    const ADMIN_ROLE = 'admin';
    const ADMIN_ROLE_NAME = 'Admin';

    const userEmail = _.first( profile.emails ).value;

    // Assign user to admin role
    Role
      .create( {
        code: ADMIN_ROLE,
        name: ADMIN_ROLE_NAME,
        userEmails: [ userEmail ]
      } )
      .then( ()=> {

        // Now define callback where conditions will be reviewed
        const callback = async ( error, user ) => {
          if ( error ) {
            return error;
          }

          const dbUser = await User.findOne( { _id: user.id } )

          expect( dbUser.firstName ).to.equal( profile.name.givenName );
          expect( dbUser.lastName ).to.equal( profile.name.familyName );
          expect( dbUser.isAdmin ).to.be.true

          done();
        }

        // Execute callback function to verify functionality
        verifyCallback( request,
          null,
          null,
          profile,
          callback
        );
      } )
      .catch( ( e ) => {
        done( e )
      } )
  } );

  it( 'GET google/callback -> if authenticated user already exists, it retrieves it\'s data from db', function ( done ) {

    const PROVIDER_ID = '123456'

    const user = {
      firstName: 'test',
      lastName: 'user',
      email: 'testuser@mail.com',
      roles: [ 'user' ],
      provider: 'google',
      providerId: PROVIDER_ID
    }

    // Add user to db
    User.create( user )
      .then( ()=>{

        // Now define callback where conditions will be reviewed
        const callback = async ( error, authorizedUser ) => {
          if ( error ) {
            return error;
          }

          expect( authorizedUser.firstName ).to.equal( user.firstName );
          expect( authorizedUser.lastName ).to.equal( user.lastName );

          done();
        }

        // Execute callback function to verify functionality
        verifyCallback( request,
          null,
          null,
          { ...profile, id: PROVIDER_ID }, // Override provider id value
          callback
        );
      } )
      .catch( ( e ) => {
        done( e )
      } )
  } );

  afterEach( async function () {
    await User.remove();
    await Role.remove();
  } )

  after( function ( done ) {
    mongoose.connection.close( done );
  } )
} );
