import React from 'react';
import Footer, { footers } from './Footer';
import _ from 'lodash';
import { render, cleanup } from '@testing-library/react'

describe( '<Footer />', () => {

  afterEach( cleanup )

  test( 'it should render footer elements', () => {
    // Arrange - Act
    const { getByText } = render( <Footer /> )

    _.each( footers, ( element ) => {
      // Assert
      expect( getByText( element.title ).textContent ).toBeTruthy()
    } )
  } )

} )

