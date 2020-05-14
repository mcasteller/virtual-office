import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import PropTypes from 'prop-types';
import { createActions } from './actions';

const initialState = {
  user: _loadUserData()
};

const Context = createContext( initialState );

const AppProvider = ( { children } ) => {

  // Listen for dispatch function execution
  const [ state, dispatch ] = useReducer( reducer, initialState );

  // Then every action will be responsible to dispatch and
  // reach out the reducer to update state with
  // asynchronous code response
  const actions = createActions( dispatch );

  // 1. Update provider with new state
  // 2. Allow children to consume state and actions
  return <Context.Provider value={[ state, actions ]}>{children}</Context.Provider>;
};

export { Context, AppProvider }

AppProvider.propTypes = {
  children: PropTypes.element.isRequired
}

function _loadUserData () {
  try {
    const serializedState = localStorage.getItem( 'user' );
    if ( serializedState === null ) {
      return undefined;
    }
    return JSON.parse( serializedState );
  } catch ( err ) {
    return undefined;
  }
}
