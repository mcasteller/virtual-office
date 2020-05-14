import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Context } from '../../context/AppProvider/store';

function AuthenticatedContent ( props ) {

  const [ state, actions ] = useContext( Context );

  const { user, error } = state;

  useEffect( () => {
    if ( _.isNil( user ) ) {
      actions.getUserProfile();
    }
  }, [] );

  if ( user ) {
    return props.children || null;
  }

  if ( error ) {
    return (
      <div span={6}>
        <h3>{error}</h3>
      </div>
    );
  }

  return <CircularProgress />
}

AuthenticatedContent.propTypes = {
  children: PropTypes.element.isRequired
}

export default AuthenticatedContent;
