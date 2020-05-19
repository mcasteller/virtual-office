
// # tests - server

const request = require( 'supertest' );
const passport = require( 'passport' );
const sinon = require( 'sinon' );
const mongoose = require( 'mongoose' );
const express = require( '../../lib/index' );
const chai = require( 'chai' );
const expect = chai.expect;
const jwt = require( 'jsonwebtoken' )
const utils = require( '../test/utils' );
const config = require( '../../config/config' );

describe( '/api/auth', function () {

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

    done();
  } );

  it( 'GET google/callback -> it generates and sign a JWT token with user data retrieved from google authentication', function ( done ) {
    agent
      .get( '/api/auth/google/callback' )
      .expect( 200 )
      .end( ( err, res ) => {
        const token = utils.getCookie( res.headers[ 'set-cookie' ], 'jwt' )

        const decoded = jwt.verify( token, config.jwt.secret )

        const { name, email, displayName, provider, roles } = decoded.data;

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
