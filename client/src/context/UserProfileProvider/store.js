import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import PropTypes from 'prop-types';
import { createActions } from './actions';

const initialState = {
  user: {}
};

const Context = createContext( initialState );

const UserProfileProvider = ( { children } ) => {

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

export { Context, UserProfileProvider }

UserProfileProvider.propTypes = {
  children: PropTypes.element.isRequired
}

