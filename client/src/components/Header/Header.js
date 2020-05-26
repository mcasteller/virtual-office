import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import { HeaderProvider } from '../../context/HeaderProvider/store';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { Context } from '../../context/AppProvider/store';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: 'flex'
  },
  toolbar: {
    maxWidth: theme.breakpoints.values.md,
    padding: theme.spacing( 0, 24 )
  },
  appBar: {
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing( 2 )
  },
  title: {
    flexGrow: 1
  }
} ) );

export default function Header ( props ) {
  // styles
  const theme = useTheme();
  const isDownXsBreak = useMediaQuery( theme.breakpoints.down( 'xs' ) );

  // Hooks
  const classes = useStyles();

  const [ open, setOpen ] = useState( true )

  const [ state, actions ] = useContext( Context );

  const user = state.user;

  function toggleMenu () {
    setOpen( !open )
  }

  return (
    <HeaderProvider>
      <AppBar
        position="relative"
        classes={{
          root: classes.appBar
        }}>
        <Container
          className={classes.innerContainer}
          maxWidth="lg"
        >
          {user && isDownXsBreak ?
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={props.menuClick}
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
              Virtual Office
          </Typography>
          <ProfileMenu />
        </Container>
      </AppBar>
    </HeaderProvider>
  );
}

Header.propTypes = {
  menuClick: PropTypes.func.isRequired
}
