import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { render, cleanup } from '@testing-library/react'

describe( '<ErrorBoundary />', () => {
  const HEADER_TEXT = 'My nice header';

  beforeAll( () => {
    jest.spyOn( console, 'error' ).mockImplementation( () => {} )
  } )

  afterEach( cleanup )

  afterAll( () => {
    jest.clearAllMocks()
  } )

  function NiceHeader ( props ) {
    return (
      <React.Fragment >
        <p>{HEADER_TEXT}</p>
        {props.children}
      </ React.Fragment>
    )
  }

  function Bomb ( { shouldThrow } ) {
    if ( shouldThrow ) {
      throw new Error( 'Error message' )
    } else {
      return null;
    }
  }

  test( 'when an error happens, it should render error message', () => {
    // Arrange
    const { getByText } = render(
      <NiceHeader>
        <ErrorBoundary>
          <Bomb shouldThrow={true} />
        </ErrorBoundary>
      </NiceHeader>
    )

    // Act

    // Assert
    expect( getByText( 'Report feedback' ).textContent ).toBe( 'Report feedback' )

    expect( getByText( /Nice/i ).textContent ).toBe( HEADER_TEXT )

  } )

} )
