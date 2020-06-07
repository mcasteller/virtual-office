import React, { useContext, useState } from 'react';
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

import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import CollapseMenuItem from '../CollapseMenuItem/CollapseMenuItem';

export default function SideNav ( props ) {

  // Styles
  const theme = useTheme();

  const isDownXsBreak = useMediaQuery( theme.breakpoints.down( 'xs' ) );

  const useStyles = makeStyles( ( theme ) => ( {
    root: {
      '& .MuiGrid-item': {
        [ theme.breakpoints.down( 'xs' ) ]: {
          display: 'none'
        }
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

  const [ open, setOpen ] = useState( isDownXsBreak )

  // functions
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

  function closeHandler ( event ) {
    if ( event.type === 'keydown' && ( event.key === 'Tab' || event.key === 'Shift' ) ) {
      return;
    }

    setOpen( !open )
  }

  return (
    <Grid
      className={classes.root}
      item xs={3}
    >
      {user && isDownXsBreak ?
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="primary"
          onClick={setOpen}
        >
          <AddCircleIcon
            fontSize="large"
            aria-label="toggle main menu"
            aria-haspopup="menu"
          >
                  Click to open menu
          </AddCircleIcon>
        </IconButton>
        : null}
      <Drawer
        variant={isDownXsBreak ? 'temporary' : 'persistent'}
        anchor="left"
        open={open || !isDownXsBreak}
        onClose={closeHandler}
      >
        <List
          aria-expanded={open}
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
  adminMenuItems: PropTypes.array,
  menuItems: PropTypes.array
}

