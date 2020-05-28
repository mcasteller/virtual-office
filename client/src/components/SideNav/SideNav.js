import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/AppProvider/store';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import CollapseMenuItem from '../CollapseMenuItem/CollapseMenuItem';

export default function SideNav ( props ) {

  // Styles
  const theme = useTheme();

  const isDownXsBreak = useMediaQuery( theme.breakpoints.down( 'xs' ) );

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
            key={index}
            subMenuItems={item.subMenuItems}
          />
        )
      case 'divider':
        return (
          <Divider
            key={index}
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
      variant={isDownXsBreak ? 'temporary' : 'persistent'}
      anchor="left"
      open={props.open}
      onClose={props.closeHandler}
    >
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
  closeHandler: PropTypes.func.isRequired,
  adminMenuItems: PropTypes.array,
  menuItems: PropTypes.array
}

