import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import AlertMessage from '../../components/AlertMessage/AlertMessage';
import SideNav from '../../components/SideNav/SideNav';
import pageStyles from './Page.styles';

export default function Page ( props ) {

  const classes = pageStyles();

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

  // TODO: pass down menu
  return (
    <>
      <Header />
      <AlertMessage />
      <Container maxWidth="md">
        <ErrorBoundary>
          <Box className={classes.root} display="flex">
            <Box flex="0 0 25%">
              <SideNav
                open={true}
                adminMenuItems={adminMenuItems}
                menuItems={menuItems}
              />
            </Box>
            <Box flex="2 0 50%">
              {props.children}
            </Box>
          </Box >
        </ErrorBoundary>
        <Footer />
      </Container>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired,
  titleComponent: PropTypes.element.isRequired
}

