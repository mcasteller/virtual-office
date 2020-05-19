
// # tests - server

const request = require( 'supertest' );
const passport = require( 'passport' );
const sinon = require( 'sinon' );
const mongoose = require( 'mongoose' );
const express = require( '../../lib/index' );
const chai = require( 'chai' );
// var sinonChai = require( 'sinon-chai' );
const expect = chai.expect;

chai.should();

describe( 'Logged in users: /api/users/', function () {

  let agent,
    app;

  const user = {
    username: 'test user',
    email: 'testuser@mail.com',
    displayName: 'Test User',
    provider: 'testCase',
    roles: [ 'admin' ]
  }

  before( function ( done ) {
    sinon.stub( passport, 'authenticate' )
      .returns(
        ( req, res, next ) => {

          req.user = user;

          next()
        }
      );

    // Get application and open test db connection
    app = express.initialize();

    agent = request.agent( app );

    // sinon.stub( passport, "authenticate" ).(req,res,next)=>{}

    done();
  } );

  it( 'GET /profile -> returns user data retrieved from authentication provider', function ( done ) {
    agent
      .get( '/api/users/profile' )
      .end( ( err, res ) => {

        const { name, email, displayName, provider, roles } = res.body;

        expect( name ).to.equal( user.username );
        expect( email ).to.equal( user.email );
        expect( displayName ).to.equal( user.displayName );
        expect( provider ).to.equal( user.provider );
        expect( roles ).to.include( user.roles[ 0 ] );

        done()
      } )
  } );

  after( function ( done ) {
    passport.authenticate.restore();

    mongoose.connection.close( done );
  } );
} );

describe( 'Not logged in users: /api/users/', function () {

  let agent,
    app;

  before( function ( done ) {
    // Get application and open test db connection
    app = express.initialize();

    agent = request.agent( app );

    done();
  } );

  it( 'GET /profile -> if no valid JWT token is found it should restrict access', function ( done ) {

    agent
      .get( '/api/users/profile' )
      .expect( 403 )
      .end( ( err, res ) => {
        expect( res.text ).to.equal( 'Unauthorized' );
        done()
      } )
  }
  );

  after( function ( done ) {
    mongoose.connection.close( done );
  } );
} );
