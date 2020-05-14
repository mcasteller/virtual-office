import React, { useContext } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppsIcon from '@material-ui/icons/Apps';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Context } from '../../context/AppProvider/store';
import { Avatar } from '@material-ui/core';

const StyledMenu = ( props ) => {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      {...props}
    />
  )
}

const StyledMenuItem = withStyles( ( theme ) => ( {
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.secondary,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black
      }
    }
  }
} ) )( MenuItem );

const StyledListItem = withStyles( ( theme ) => ( {
  root: {
    display: 'block',
    textAlign: 'center',
    '&:focus': {
      outline: theme.palette.common.white
    }
  }
} ) )( ListItem );

const StyledAvatar = withStyles( ( theme ) => ( {
  root: {
    margin: '0 auto'
  }
} ) )( Avatar );

export default function ProfileMenu () {
  const [ state, actions ] = useContext( Context );

  const user = state.user;

  const [ anchorEl, setAnchorEl ] = React.useState( null );

  const handleClick = ( event ) => {
    setAnchorEl( event.currentTarget );
  };

  const handleClose = () => {
    setAnchorEl( null );
  };

  function logout ( e ) {
    console.log( 'logout' );
    actions.logout();
    handleClose();
  }

  const userItems = [
    {
      icon: <DashboardIcon fontSize="small" />,
      body: <ListItemText primary="Dashboard" />,
      to: '/dashboard'
    },
    {
      icon: <SettingsIcon fontSize="small" />,
      body: <ListItemText primary="User settings" />,
      to: '/settings/account'
    },
    {
      icon: <ExitToAppIcon fontSize="small" />,
      body: <ListItemText primary="Logout" />,
      onClick: logout
    }
  ]

  const menuItems = [
    {
      icon: <DashboardIcon fontSize="small" />,
      body: <ListItemText primary="Login with Google" />,
      to: '/auth/google'
    }
  ]

  function userProfile () {
    return (
      <StyledListItem alignItems="flex-start">
        {user ?
          <ListItemAvatar>
            <StyledAvatar>{_.first( user.displayName )}</StyledAvatar>
          </ListItemAvatar>
          :
          <ListItemIcon>
            <AccountCircleIcon fontSize="large"/>
          </ListItemIcon>
        }
        <ListItemText
          primary={user ? user.displayName : "Not signed in" }
          secondary={
            user ? ' — Navigate through options below'
              : ' — Please choose sign in option below'
          } />
      </StyledListItem>
    )
  }

  function menuItemsBuilder ( items ) {
    return items.map( ( item, index ) => (
      <StyledMenuItem
        component={item.baseComponent || Link}
        href={item.to ? item.to : undefined}
        key={index}
        onClick={item.onClick ? item.onClick : undefined}
      >
        {item.icon &&
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
        }
        {item.body}
      </StyledMenuItem>
    )
    )
  }

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        aria-label="toggle user account menu"
      >
        <AppsIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean( anchorEl )}
        onClose={handleClose}
        aria-label='Account Information'
        aria-expanded={Boolean( anchorEl )}
      >
        {userProfile()}
        {
          user ?
            menuItemsBuilder( userItems )
            : menuItemsBuilder( menuItems )
        }
      </StyledMenu>
    </div>
  )

}
