import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context/AppProvider/store';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';

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

  const useStyles = makeStyles( ( theme ) => ( {
    root: {
      [ theme.breakpoints.down( 'xs' ) ]: {
        display: 'none'
      },

      '& .MuiDrawer-paper': {
        position: 'relative',
        border: 'none',
        backgroundColor: theme.palette.grey[ 100 ]
      }
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
    <Grid
      className={classes.root}
      item xs={3}
    >
      <Drawer
        variant={isDownXsBreak ? 'temporary' : 'persistent'}
        anchor="left"
        open={props.open || !isDownXsBreak}
        onClose={props.closeHandler}
      >
        <List
          aria-expanded={props.open}
          role= "menu"
          aria-haspopup="menu"
        >
          {user.isAdmin ?
            menuItemsBuilder( props.adminMenuItems )
            : menuItemsBuilder( props.menuItems )
          }
        </List>
      </Drawer>
    </Grid>
  )
}

SideNav.propTypes = {
  open: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  adminMenuItems: PropTypes.array,
  menuItems: PropTypes.array
}

