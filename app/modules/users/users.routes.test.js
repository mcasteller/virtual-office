
// # tests - server

const request = require( 'supertest' );
const mongoose = require( 'mongoose' );
const _ = require( 'lodash' );
const jwt = require( 'jsonwebtoken' )
const chai = require( 'chai' );
const expect = chai.expect;

const User = require( './users.model' );
const express = require( '../../lib/index' );
const config = require( '../../config/config' );

chai.should();

describe( '/api/users/', function () {

  const UNAUTHORIZED = 'Unauthorized';

  let agent,
    app,
    adminUser,
    adminToken;

  before( function ( done ) {

    // Start server
    app = express.initialize();

    agent = request( app );

    // Create user for JWT to validate against
    adminUser = new User( {
      firstName: 'test',
      lastName: 'user',
      email: 'testuser@mail.com',
      roles: [ 'admin' ],
      providerId: '123456',
      provider: 'google'
    } )

    adminUser.save( ( err, user ) => {
      adminUser = _.pick( user, [ 'firstName', 'lastName', 'email', '_id', 'isAdmin' ] );

      adminToken = jwt.sign(
        { data: adminUser }, config.jwt.secret, { expiresIn: '5d' }
      );

      done();
    } );

  } );

  it( 'GET /credentials -> if JWT provided is a valid one then returns user data from DB based on JWT token', function ( done ) {
    agent
      .get( '/api/users/credentials' )
      .set( 'Cookie', `jwt=${ adminToken }` )
      .end( ( err, res ) => {
        const { firstName, lastName, email, isAdmin } = res.body;

        expect( firstName ).to.equal( adminUser.firstName );
        expect( lastName ).to.equal( adminUser.lastName );
        expect( email ).to.equal( adminUser.email );
        expect( isAdmin ).to.be.true;

        done()
      } )
  } );

  it( 'GET /credentials -> if JWT is invalid or missing, return an error', function ( done ) {

    agent
      .get( '/api/users/credentials' )
      .set( 'Cookie', 'jwt=123456321' )
      .end( ( err, res ) => {
        expect( res.status ).to.equal( 401 )
        expect( res.text ).to.equal( UNAUTHORIZED );

        done()
      } )
  } );

  it( 'GET / -> if JWT provided is a valid one then returns user profile data from DB based on JWT token', function ( done ) {
    agent
      .get( '/api/users/' )
      .set( 'Cookie', `jwt=${ adminToken }` )
      .end( ( err, res ) => {
        const { firstName, lastName, email, isAdmin } = res.body;

        expect( firstName ).to.equal( adminUser.firstName );
        expect( lastName ).to.equal( adminUser.lastName );
        expect( email ).to.equal( adminUser.email );
        expect( isAdmin ).to.be.true;

        done()
      } )
  } );

  it( 'GET / -> if JWT provided is NOT valid then returns an error message', function ( done ) {
    agent
      .get( '/api/users/' )
      .set( 'Cookie', 'jwt=papaya' )
      .end( ( err, res ) => {
        expect( res.status ).to.equal( 401 )
        expect( res.text ).to.equal( UNAUTHORIZED );

        done()
      } )
  } );

  after( async function () {
    await User.remove();
    await mongoose.connection.close();
  } );
} );
