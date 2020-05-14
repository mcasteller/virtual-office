import React from 'react';
import _ from 'lodash';
import { render, cleanup } from '@testing-library/react'

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Context } from '../../context/AppProvider/store';
import SideNav from './SideNav';

describe( '<SideNav />', () => {

  // SideNav settings
  const adminMenuItems = [
    {
      text: 'Inbox',
      icon: <InboxIcon titleAccess="meaning" />,
      to: '',
      onClick: '',
      container: ''
    },
    {
      text: 'Starred',
      icon: <MailIcon titleAccess="meaning" />,
      to: '',
      onClick: '',
      container: ''
    }
  ]

  const menuItems = [
    {
      text: 'User item',
      icon: <InboxIcon />,
      to: '',
      onClick: ''
    }
  ]

  afterEach( cleanup )

  test( 'when open property is true, then primary menu is visible', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith'
      }
    };
    const actions = {};

    const { getByRole } = render(
      <Context.Provider value={[ state, actions ]}>
        <SideNav
          open={true}
          adminMenuItems={adminMenuItems}
          menuItems={menuItems}
        />
      </Context.Provider>
    )

    // Act
    const menuElement = getByRole( 'menu' );
    const expanded = menuElement.getAttribute( 'aria-expanded' );

    // Assert
    expect( expanded ).toBe( "true" );
  } )

  test( 'when open prop is set to false, then menu is hidden', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith'
      }
    };
    const actions = {};

    const { getByRole } = render(
      <Context.Provider value={[ state, actions ]}>
        <SideNav
          open={false}
          adminMenuItems={adminMenuItems}
          menuItems={menuItems}
        />
      </Context.Provider>
    )

    // Act
    const menuElement = getByRole( 'menu' );
    const expanded = menuElement.getAttribute( 'aria-expanded' );

    // Assert
    expect( expanded ).toBe( "false" );
  } )

  test( 'if user is admin then will see admin menu items', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith',
        isAdmin: true
      }
    };
    const actions = {};

    const { getAllByRole } = render(
      <Context.Provider value={[ state, actions ]}>
        <SideNav
          open={true}
          adminMenuItems={adminMenuItems}
          menuItems={menuItems}
        />
      </Context.Provider>
    )

    // Act
    const menuElement = getAllByRole( 'menuitem' );

    // Assert
    expect( menuElement.length ).toBe( 2 );
  } )

  test( 'if user is NOT admin then will see default menu items', () => {
    // Arrange
    const state = {
      user: {
        displayName: 'John Smith',
        isAdmin: false
      }
    };
    const actions = {};

    const { getAllByRole } = render(
      <Context.Provider value={[ state, actions ]}>
        <SideNav
          open={true}
          adminMenuItems={adminMenuItems}
          menuItems={menuItems}
        />
      </Context.Provider>
    )

    // Act
    const menuElement = getAllByRole( 'menuitem' );

    // Assert
    expect( menuElement.length ).toBe( 1 );
  } )
} )
