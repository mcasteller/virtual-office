import { constants } from './actions';

const reducer = ( state, action ) => {
  switch( action.type ) {
  case constants.LOGIN_SUCCESS:
    return { ...state, message: action.payload }
  default:
    throw new Error();
  }
}

export default reducer;
