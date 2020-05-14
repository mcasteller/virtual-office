import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorder from '@material-ui/icons/StarBorder';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Context } from '../../context/AppProvider/store';
import { HeaderProvider } from '../../context/HeaderProvider/store';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SideNav from '../SideNav/SideNav';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: 'flex'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing( 3 )
  },
  menuButton: {
    marginRight: theme.spacing( 2 )
  },
  title: {
    flexGrow: 1
  }
} ) );

export default function Header () {
  // Hooks
  const classes = useStyles();

  const [ open, setOpen ] = useState( true )

  const [ state, actions ] = useContext( Context );

  const user = state.user;

  function toggleMenu () {
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
    <HeaderProvider>
      <>
        <AppBar position="fixed">
          <Toolbar>
            {user ?
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={toggleMenu}
              >
                <MenuIcon
                  aria-label="toggle main menu"
                  aria-pressed={open}
                  aria-haspopup="menu"
                >
                  Click to open menu
                </MenuIcon>
              </IconButton>
              : null}
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <ProfileMenu />
          </Toolbar>
        </AppBar>
        {user ? <SideNav
          open={open}
          adminMenuItems={adminMenuItems}
          menuItems={menuItems}
        /> : null}
      </>
    </HeaderProvider>
  );
}
