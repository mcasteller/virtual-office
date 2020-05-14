import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function CollapseMenuItem ( props ) {

  // Hooks
  const useStyles = makeStyles( ( theme ) => ( {
    nested: {
      paddingLeft: theme.spacing( 4 )
    }
  } ) );

  const classes = useStyles();

  const [ subMenuOpen, setSubmenuOpen ] = useState( false )

  function handleClick () {
    setSubmenuOpen( !subMenuOpen )
  }

  return (
    <>
      <ListItem
        button
        role="menuitem"
        onClick={handleClick}
      >
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText primary={props.text} />
        {subMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={subMenuOpen}
        timeout="auto"
        unmountOnExit>
        <List
          component="div"
          disablePadding
        >
          {props.subMenuItems.map( ( subitem, index ) => (
            <ListItem
              button
              role="menuitem"
              aria-hidden={!subMenuOpen}
              className={classes.nested}
              key={index}>
              <ListItemIcon>
                {subitem.icon}
              </ListItemIcon>
              <ListItemText primary={subitem.text} />
            </ListItem>
          ) )}
        </List>
      </Collapse>
    </>
  )
}

CollapseMenuItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  subMenuItems: PropTypes.array
}
