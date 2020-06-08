import * as api from './api';

// Constants
export const constants = {
  GET_MESSAGE_SUCCESS: 'GET_MESSAGE.SUCCESS',
  GET_USER_PROFILE_SUCCESS: 'GET_USER_PROFILE_SUCCESS',
  GET_USER_PROFILE_FAILURE: 'GET_USER_PROFILE_FAILURE',
  UPDATE_USER_PROFILE_SUCCESS: 'UPDATE_USER_PROFILE_SUCCESS',
  UPDATE_USER_PROFILE_FAILURE: 'UPDATE_USER_PROFILE_FAILURE',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
  ALERT: 'ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT'

};

// Actions will be responsible for retrieving data
// to be later used by reducers to update current state
export function createActions ( dispatch ) {
  return {
    getUserProfile: async () => {
      try {
        const user = await api.getUserProfile();

        localStorage.setItem( "user", JSON.stringify( user ) );

        dispatch( {
          type: constants.GET_USER_PROFILE_SUCCESS,
          user
        } );
      } catch ( err ) {
        dispatch( {
          type: constants.GET_USER_PROFILE_FAILURE,
          alert: {
            message: `Error retrieving user profile - ${ err.message }`,
            severity: 'error'
          }
        } );
      }
    },
    clearAlert: () => {
      dispatch( {
        type: constants.CLEAR_ALERT
      } );
    },
    updateUserProfile: async ( data ) => {
      try {
        const user = await api.updateUserProfile( data );

        localStorage.setItem( "user", JSON.stringify( user ) );

        dispatch( {
          type: constants.UPDATE_USER_PROFILE_SUCCESS,
          user,
          alert: {
            message: 'User profile successfully updated!',
            severity: 'success'
          }
        } );
      } catch ( err ) {
        dispatch( {
          type: constants.UPDATE_USER_PROFILE_FAILURE,
          alert: {
            message: `Error updating user profile - ${ err }`,
            severity: 'error'
          }
        } );
      }
    }
  }
}
