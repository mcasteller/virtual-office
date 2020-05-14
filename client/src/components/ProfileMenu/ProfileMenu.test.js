import React from 'react';
import ProfileMenu from './ProfileMenu';
import { render, cleanup } from '@testing-library/react'
import { Context } from '../../context/AppProvider/store';

describe( '<ProfileMenu />', () => {

  afterEach( cleanup )

  test( 'if user is logged in, it renders user name', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith'
      }
    };
    const actions = {};

    // Act
    const { getByText } = render(
      <Context.Provider value={[ state, actions ]}>
        <ProfileMenu />
      </Context.Provider>
    )

    const exampleInput = getByText( state.user.displayName )

    // Assert
    expect( exampleInput ).toBeTruthy();

  } )

  test( 'if user is NOT logged in, it display a not logged in message to user', () => {
    const NOT_SIGNED_IN = 'Not signed in';

    // Arrange
    const state = {
      user: undefined
    };
    const actions = {};

    // Act
    const { getByText } = render(
      <Context.Provider value={[ state, actions ]}>
        <ProfileMenu />
      </Context.Provider>
    )

    const exampleInput = getByText( NOT_SIGNED_IN )

    // Assert
    expect( exampleInput ).toBeTruthy();
  } )

  // TODO: complete
  test.skip( 'if user is logged in, it display user menu options', () => {

  } )

  // TODO: complete
  test.skip( 'if user is NOT logged in, it display log in channel alternatives', () => {

  } )

} )
