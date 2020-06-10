import React, { useContext } from 'react';
import _ from 'lodash';
import { withStyles, useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Context } from '../../context/AppProvider/store';
import { Avatar } from '@material-ui/core';

const StyledMenu = ( props ) => {
  const theme = useTheme();
  const matches = useMediaQuery( theme.breakpoints.down( 'sm' ) );

  return (
    <Menu
      elevation={1}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: matches ? 'right' : 'center'
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

// styles
const useStyles = makeStyles( ( theme ) => ( {
  button: {
    height: '50px',
    color: theme.palette.grey[ 1000 ],
    margin: theme.spacing( 0.3, 0 ),
    textTransform: 'initial',
    '& span > *': {
      margin: theme.spacing( 0.1, 1 )
    }
  },
  listItem: {
    '& .MuiAvatar-root': {
      margin: theme.spacing( 0, 'auto' )
    }
  }
} ) );

export default function ProfileMenu () {

  // Hooks
  const classes = useStyles();

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
      body: <ListItemText primary="Mis Tareas" />,
      to: '/dashboard'
    },
    {
      icon: <SettingsIcon fontSize="small" />,
      body: <ListItemText primary="Configuracion de cuenta" />,
      to: '/settings/account'
    },
    {
      icon: <ExitToAppIcon fontSize="small" />,
      body: <ListItemText primary="Salir" />,
      onClick: logout
    }
  ]

  const menuItems = [
    {
      icon: <DashboardIcon fontSize="small" />,
      body: <ListItemText primary="Login with Google" />,
      to: '/api/auth/google'
    }
  ]

  function userProfile () {
    return (
      <StyledListItem alignItems="flex-start">
        {user ?
          <Typography variant="h5">
            Hola {user.firstName}
          </Typography>
          :
          <ListItemIcon>
            <AccountCircleIcon fontSize="large"/>
          </ListItemIcon>
        }
        <ListItemText
          primary={user ? user.displayName : "Not signed in" }
          secondary={
            user ? ' — Elige una de las siguientes opciones'
              : ' — Por favor elija una opcion para ingresar'
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
      <Button
        className={classes.button}
        variant="outlined"
        color="error"
        onClick={handleClick}
        aria-haspopup="true"
        aria-label="toggle user account menu"
      >
        {user ?
          <>
            <Hidden smDown>
              {user.firstName}
            </Hidden>
            <Avatar alt={user.displayName} src={user.profileImageURL} />
          </>
          :
          'Registrarse'
        }
      </Button>
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
