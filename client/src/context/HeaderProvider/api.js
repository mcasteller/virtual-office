
export function login ( data ) {
  return fetch( 'http://localhost:3100/users/auth/google', {
    mode: 'no-cors',
    method: 'GET',
    // body: {
    //   data
    // }
  } )
    .then( response => response.json() )
    .catch( ( e ) => console.log( "Error", e ) );
}
