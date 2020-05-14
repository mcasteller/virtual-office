const cors = require( 'cors' );
/**
* Initialize security
*/
module.exports.initialize = function ( app ) {

  app.use( cors() );
  // allow CORS for the API route
  // app.use( ( req, res, next ) => {
  //   res.header( 'Access-Control-Allow-Origin', '*' );
  //   res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );

  //   return next();
  // } );
}
