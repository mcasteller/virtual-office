import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { HeaderProvider } from '../../context/HeaderProvider/store';
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
    marginBottom: theme.spacing( 3 )
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

export default function Header () {
  // Hooks
  const classes = useStyles();

  return (
    <HeaderProvider>
      <AppBar
        position="relative"
        classes={{
          root: classes.appBar
        }}>
        <Container
          className={classes.innerContainer}
          maxWidth="md"
        >
          <Typography variant="h6" className={classes.title}>
              Virtual Office
          </Typography>
          <ProfileMenu />
        </Container>
      </AppBar>
    </HeaderProvider>
  );
}
