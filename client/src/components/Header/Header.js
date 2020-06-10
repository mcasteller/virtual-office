import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GavelIcon from '@material-ui/icons/Gavel';

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
    height: theme.spacing( 8 ),
    backgroundColor: theme.palette.common.white
  },
  innerContainer: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    textDecoration: 'none'
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
        <Link
          className={classes.link}
          to="/">
          <GavelIcon
            fontSize="large"
            color="primary"/>
          <Typography variant="h6" className={classes.title}>
              abogados.com
          </Typography>
        </Link>
        <ProfileMenu />
      </Container>
    </AppBar>
  );
}

