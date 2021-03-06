import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import SideNav from '../../components/SideNav/SideNav';
import { Context } from '../../context/AppProvider/store';

export default function SideNavPage ( props ) {

  // Hooks
  const [ state, actions ] = useContext( Context );

  const { user } = state

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
    },
    {
      container: 'divider'
    },
    {
      text: 'Send Email',
      icon: <MailIcon titleAccess="meaning" />,
      to: '',
      onClick: '',
      container: ''
    },
    {
      text: 'Starred',
      icon: <MailIcon titleAccess="meaning" />,
      container: 'collapse',
      subMenuItems: [
        {
          text: 'Children 1',
          icon: <StarBorder titleAccess="meaning" />,
          to: ''
        },
        {
          text: 'Children 2',
          icon: <StarBorder titleAccess="meaning" />,
          to: ''
        }
      ]
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

  return (
    <Container>
      <Grid
        container
        spacing={5}
      >
        {user ?
          <Grid
            item
            xs={2}
          >
            <SideNav
              adminMenuItems={adminMenuItems}
              menuItems={menuItems}
            />
          </Grid>
          : null }
        <Grid
          item
          xs={12}
          sm={user ? 10 : 12}
        >
          {props.children}
        </Grid>
      </Grid >
    </Container>
  );
}

SideNavPage.propTypes = {
  children: PropTypes.array.isRequired
}
