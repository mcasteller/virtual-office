import * as React from 'react';
import AlertMessage from './AlertMessage'
import { render, cleanup } from '@testing-library/react'
import { Context } from '../../context/AppProvider/store';

describe( '<AlertMessage />', () => {

  afterEach( cleanup )

  test( 'should show alert information', () => {
    // Arrange
    const state = {
      alert: {
        severity: 'success',
        message: 'User Saved'
      }
    };
    const actions = {}

    // Act
    const { getByText } = render(
      <Context.Provider value={[ state, actions ]}>
        <AlertMessage />
      </Context.Provider>
    )

    // Assert
    expect( getByText( /User/i ).textContent ).toBe( state.alert.message )
  } )
} )
