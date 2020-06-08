import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

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
  // Hooks
  const classes = useStyles();

  return (
    <AppBar
      position="relative"
      classes={{
        root: classes.appBar
      }}>
      <Container
        className={classes.innerContainer}
        maxWidth="lg"
      >
        <Typography variant="h6" className={classes.title}>
              Virtual Office
        </Typography>
        <ProfileMenu />
      </Container>
    </AppBar>
  );
}

