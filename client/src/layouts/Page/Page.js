import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hidden from '@material-ui/core/Hidden';

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

  // Styles
  const classes = pageStyles();

  // Hooks
  const theme = useTheme();
  const isDownXsBreak = useMediaQuery( theme.breakpoints.down( 'xs' ) );

  const [ open, setOpen ] = useState( isDownXsBreak )

  function toggleDrawer ( event ) {
    if ( event.type === 'keydown' && ( event.key === 'Tab' || event.key === 'Shift' ) ) {
      return;
    }

    setOpen( !open )
  }

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
    <>
      <Header
        menuClick={toggleDrawer}
      />
      <AlertMessage />
      <ErrorBoundary>
        <Box className={classes.content}>
          <Container
            maxWidth="lg"
            className={classes.container}
          >
            <Grid
              className={classes.root}
              container
              spacing={5}
            >
              {isDownXsBreak ?
                <SideNav
                  open={open}
                  closeHandler={toggleDrawer}
                  adminMenuItems={adminMenuItems}
                  menuItems={menuItems}
                />
                : <Grid
                  className={classes.left}
                  item xs={3} >
                  <SideNav
                    open={true}
                    closeHandler={toggleDrawer}
                    adminMenuItems={adminMenuItems}
                    menuItems={menuItems}
                  />
                </Grid>
              }
              <Grid className={classes.right} item xs={12} sm={9} >
                {props.children}
              </Grid>
            </Grid >
          </Container>
        </Box>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired
}

