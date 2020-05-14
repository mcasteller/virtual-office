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
          user
        } );
      } catch ( e ) {
        dispatch( {
          type: constants.GET_USER_PROFILE_FAILURE,
          errorMessage: e.message || e
        } );
      }
    },
    logout: async () => {
      try {
        // TODO: logout with Redis feature
        // const response = await api.logout();
        const response = { message: 'User successfully loged out!' }

        history.push( '/' );

        localStorage.removeItem( "user" );

        dispatch( {
          type: constants.LOGOUT_SUCCESS,
          alert: {
            message: response.message,
            severity: 'success'
          }
        } );
      } catch ( e ) {
        dispatch( {
          type: constants.LOGOUT_FAILURE,
          errorMessage: e.message || e
        } );
      }
    },
    alert: ( { message, severity } ) => {
      dispatch( {
        type: constants.ALERT,
        alert: {
          message,
          severity
        }
      } );
    },
    clearAlert: () => {
      dispatch( {
        type: constants.CLEAR_ALERT
      } );
    }
  }
}
