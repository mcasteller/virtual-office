
export function getUserProfile () {
  return fetch( '/api/users', { method: 'GET' } )
    .then( _handleErrors )
    .then( response => response.json() )
}

export function updateUserProfile ( data ) {
  return fetch( '/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( data )
  } )
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

