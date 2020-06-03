const _ = require( 'lodash' );
const { logger } = require( '../../lib/logger' );
const User = require( './users.model' );

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

  const { firstName, lastName, address, phone, birthDate } = req.body;

  const currentUser = await User.findOne( { providerId: req.user.providerId } );

  currentUser = _.merge( currentUser, {
    firstName,
    lastName,
    address,
    phone,
    birthDate } );

  const updatedUser = await currentUser.save();

  res.json( updatedUser );
}

module.exports = {
  getCredentials,
  getProfile,
  update
}

