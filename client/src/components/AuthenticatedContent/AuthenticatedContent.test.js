import * as React from 'react';
import AuthenticatedContent from './AuthenticatedContent'
import { render, cleanup } from '@testing-library/react'
import { Context } from '../../context/AppProvider/store';

describe( '<AuthenticatedContent />', () => {

  afterEach( cleanup )

  test( 'if user data is available then it should render child components', () => {
    // Arrange
    const state = {
      user: {
        name: 'John',
        email: 'mail@mail.com'
      }
    };
    const actions = {}
    const childComponentText = 'This is authenticated content';

    // Act
    const { getByText } = render(
      <Context.Provider value={[ state, actions ]}>
        <AuthenticatedContent>
          <p>{childComponentText}</p>
        </AuthenticatedContent>
      </Context.Provider>
    )

    // Assert
    expect( getByText( /This/i ).textContent ).toBe( childComponentText )
  } )

  test( 'if user data is NOT available then it should NOT render child components', () => {
    // Arrange
    const state = {
      user: undefined
    };
    const actions = {
      getUserProfile: jest.fn()
    }
    const childComponentText = 'This is authenticated content';

    // Act
    const { getByText } = render(
      <Context.Provider value={[ state, actions ]}>
        <AuthenticatedContent>
          <p>{childComponentText}</p>
        </AuthenticatedContent>
      </Context.Provider>
    )

    // Assert
    expect( () => getByText( /This/i ).textContent ).toThrow();
  } )
} )
