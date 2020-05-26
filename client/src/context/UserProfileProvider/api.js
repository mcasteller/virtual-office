
export function getUserProfile () {
  return fetch( '/api/users/profile', { method: 'GET' } )
    .then( _handleErrors )
    .then( response => response.json() )
}

export function logout () {
  return fetch( '/api/users/logout', { method: 'GET' } )
    .then( _handleErrors )
    .then( response => response.json() )
}

function _handleErrors ( response ) {
  if ( !response.ok ) {
    throw Error( response.statusText );
  }
  return response;
}

