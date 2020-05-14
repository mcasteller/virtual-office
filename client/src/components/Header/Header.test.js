import React from 'react';
import Header from './Header';
import { render, cleanup, fireEvent } from '@testing-library/react'
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Context } from '../../context/AppProvider/store';

jest.mock( '../ProfileMenu/ProfileMenu' );
ProfileMenu.mockReturnValue( <div>ProfileMenu</div> );

describe( '<Header />', () => {

  afterEach( cleanup )

  test( 'if user is signed in, then main menu is opened by default at page load', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith'
      }
    }
    const actions = {}

    // Act
    const { getByLabelText } = render(
      <Context.Provider value={[ state, actions ]}>
        <Header />
      </Context.Provider>
    )

    // Assert
    const labelAttribute = getByLabelText( 'toggle main menu' )
      .getAttribute( 'aria-pressed' );

    expect( labelAttribute ).toBe( "true" )
  } )

  test( 'if user is NOT signed in, then main menu should be hidden', () => {
    // Arrange
    const state = {
      user: undefined
    }
    const actions = {}

    // Act
    const { getByLabelText } = render(
      <Context.Provider value={[ state, actions ]}>
        <Header />
      </Context.Provider>
    )

    // Assert
    expect( () => getByLabelText( 'toggle main menu' ) ).toThrow();
  } )

  test( 'menu button should update open state property', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith'
      }
    }
    const actions = {}

    const { getByLabelText } = render(
      <Context.Provider value={[ state, actions ]}>
        <Header />
      </Context.Provider>
    )

    // Act
    const menuButton = getByLabelText( 'toggle main menu' );

    fireEvent.click( menuButton );

    // Assert
    const labelAttribute = getByLabelText( 'toggle main menu' ).getAttribute( 'aria-pressed' );
    expect( labelAttribute ).toBe( "false" )
  } )
} )
