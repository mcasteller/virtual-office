const _ = require( 'lodash' );
const { logger } = require( '../../lib/logger' );
const User = require( './users.model' );

const whitelistedFields = [ 'firstName', 'lastName', 'phone', 'address' ];

async function getProfile ( req, res, next ) {

  const userId = req.user._id;;

  const user = await User.findOne( { _id: userId } );

  res.json( user );
}

function getCredentials ( req, res, next ) {

  const user = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  }

  res.json( user )
}

async function update ( req, res, next ) {

  const params = _.pick( req.body, whitelistedFields );

  const user = await User.findOne( { _id: req.user._id } );

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.address = req.body.address;
  user.phone = req.body.phone;

  console.log('user', user)

  await user.save();

  res.json( user );
}

module.exports = {
  getCredentials,
  getProfile,
  update
}

