
// # tests - server

const request = require( 'supertest' );
const passport = require( 'passport' );
const jwt = require( 'jsonwebtoken' )
const sinon = require( 'sinon' );
const mongoose = require( 'mongoose' );
const chai = require( 'chai' );
const expect = chai.expect;

const express = require( '../../lib/index' );
const utils = require( '../test/utils' );
const config = require( '../../config/config' );

describe( '/api/auth', function () {

  let agent,
    app;

  const user = {
    firstName: 'test',
    lastName: 'user',
    email: 'testuser@mail.com',
    roles: [ 'user' ]
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

  it( 'GET google/callback -> it generates, sign and returns a JWT token with user data', function ( done ) {

    agent
      .get( '/api/auth/google/callback' )
      .expect( 200 )
      .end( ( err, res ) => {
        const token = utils.getCookie( res.headers[ 'set-cookie' ], 'jwt' )

        const decoded = jwt.verify( token, config.jwt.secret )

        // we expect at least these fields to be available
        const { _id, firstName, lastName, email, roles } = decoded.data;

        expect( _id ).to.equal( user._id );
        expect( firstName ).to.equal( user.firstName );
        expect( lastName ).to.equal( user.lastName );
        expect( email ).to.equal( user.email );
        expect( roles ).to.include( user.roles[ 0 ] );

        done()
      } )
  } );

  after( function ( done ) {
    passport.authenticate.restore();
    mongoose.connection.close( done );
  } );
} );
