import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/AppProvider/store';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import CollapseMenuItem from '../CollapseMenuItem/CollapseMenuItem';

export default function SideNav ( props ) {

  // Styles
  const drawerWidth = 240;

  const useStyles = makeStyles( ( theme ) => ( {
    root: {
      display: 'flex'
    },
    appBar: {
      width: `calc(100% - ${ drawerWidth }px)`,
      marginLeft: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      height: '100%',
      flexShrink: 0,
      position: 'fixed',
      zIndex: theme.zIndex.speedDial
    },
    drawerPaper: {
      top: 'unset',
      width: drawerWidth
    },
    drawerOpen: {
      top: 'unset',
      width: drawerWidth,
      transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest
      } )
    },
    drawerClose: {
      top: 'unset',
      transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest
      } ),
      width: '0'
    },
    nested: {
      paddingLeft: theme.spacing( 4 )
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

  const classes = useStyles();

  // Hooks
  const [ state, actions ] = useContext( Context );

  const { user } = state

  function menuItemsBuilder ( items ) {
    return items.map( ( item, index ) => {
      switch ( item.container ) {
      case 'collapse':
        return (
          <CollapseMenuItem
            text={item.text}
            icon={item.icon}
            subMenuItems={item.subMenuItems}
          />
        )
      case 'divider':
        return (
          <Divider
            aria-orientation="vertical"
          />
        )
      default:
        return (
          <ListItem
            button
            key={item.text}
            role="menuitem"
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )
      }
    } )
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: props.open ? classes.drawerOpen : classes.drawerClose
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List
        aria-expanded={props.open}
        role= "menu"
        aria-haspopup="menu"
      >
        {user && user.isAdmin
          ? menuItemsBuilder( props.adminMenuItems )
          : menuItemsBuilder( props.menuItems )
        }
      </List>
    </Drawer>

  )
}

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
  adminMenuItems: PropTypes.array,
  menuItems: PropTypes.array
}

