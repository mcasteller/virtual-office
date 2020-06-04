import * as api from './api';
import history from '../../history';

// Constants
export const constants = {
  GET_MESSAGE_SUCCESS: 'GET_MESSAGE.SUCCESS',
  GET_USER_PROFILE_SUCCESS: 'GET_USER_PROFILE_SUCCESS',
  GET_USER_PROFILE_FAILURE: 'GET_USER_PROFILE_FAILURE',
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
          user,
          alert: {
            message: 'Retrieving user profile',
            severity: 'success'
          }
        } );
      } catch ( e ) {
        dispatch( {
          type: constants.GET_USER_PROFILE_FAILURE,
          alert: {
            message: 'Error retrieving user profile',
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
    updateUserProfile: async () => {
      try {
        const user = await api.updateUserProfile();

        localStorage.setItem( "user", JSON.stringify( user ) );

        dispatch( {
          type: constants.UPDATE_USER_PROFILE_SUCCESS,
          user,
          alert: {
            message: 'User profile successfully updated!',
            severity: 'success'
          }
        } );
      } catch ( e ) {
        dispatch( {
          type: constants.UPDATE_USER_PROFILE_FAILURE,
          alert: {
            message: 'Error updating user profile',
            severity: 'error'
          }
        } );
      }
    }
  }
}
