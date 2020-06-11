import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles( ( theme ) => ( {
  section: {
    color: theme.palette.common.blackZ,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'visible',
    height: '100vh'
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.1,
    zIndex: -1
  },
  image: {
    width: '100%',
    opacity: '0.5',
    position: 'absolute',
    top: '0',
    zIndex: -2
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing( 4 ),
    marginTop: theme.spacing( 4 ),
    [ theme.breakpoints.up( 'sm' ) ]: {
      marginTop: theme.spacing( 10 )
    }
  },
  container: {
    margin: theme.spacing( 5, 0 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  more: {
    marginTop: theme.spacing( 2 )
  },
  textSeparator: {
    padding: '10vh',
    '& .MuiSvgIcon-root': {
      width: '100%',
      fontSize: '35px'
    }
  }
} ) );

function LabelHero ( props ) {

  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container className={classes.container}>
        <Typography color="inherit" align="center" variant="h3" marked="center">
          {props.title}
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          {props.description}
        </Typography>
        <Box className={classes.textSeparator}>
          <MoreHorizIcon />
        </Box>
      </Container>
    </section>
  );
}

export default LabelHero;

LabelHero.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string
}
