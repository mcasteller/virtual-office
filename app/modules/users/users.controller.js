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
    isAdmin: req.user.isAdmin,
    profileImageURL: req.user.profileImageURL
  }

  res.json( user )
}

async function update ( req, res, next ) {

  const user = await User.findOne(
    { _id: req.user._id },
    whitelistedFields.join( ' ' )
  );

  if ( req.body.firstName ) {
    user.firstName = req.body.firstName;
  }
  if ( req.body.lastName ) {
    user.lastName = req.body.lastName;
  }
  if ( req.body.address ) {
    user.address = req.body.address;
  }
  if ( req.body.phone ) {
    user.phone = req.body.phone;
  }

  await user.save();

  res.json( user );
}

module.exports = {
  getCredentials,
  getProfile,
  update
}

