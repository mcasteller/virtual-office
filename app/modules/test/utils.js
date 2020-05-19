module.exports.getCookie = function ( cookieHeaders, cookieName ) {

  let oneCookie;

  for( let i=0; i<cookieHeaders.length; i++ ){
    oneCookie = cookieHeaders[ i ];
    oneCookie = oneCookie.split( ';' );
    oneCookie = oneCookie[ 0 ].split( '=' )

    if ( oneCookie[ 0 ] === cookieName ) {
      return oneCookie[ 1 ];
    }
  }

  return "No cookie found";
}
