
function isAdmin ( req, res, next ) {
  return _checkRole( 'admin', req, res, next )
}

function _checkRole ( roleToAllow, req, res, next ) {

  const roles = req.user.roles;

  const isAllowed = roles.find( ( role ) => role === roleToAllow );

  if ( isAllowed ) {
    // Access granted! Invoke next middleware
    return next();
  } else {
    return res.status( 403 ).json( {
      message: 'User is not authorized'
    } );
  }
}

module.exports.isAdmin = isAdmin
