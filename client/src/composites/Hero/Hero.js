import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( ( theme ) => ( {
  section: {
    color: theme.palette.common.blackZ,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    [ theme.breakpoints.up( 'sm' ) ]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1300
    }
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
  heroContent: {
    marginTop: theme.spacing( 3 ),
    marginBottom: theme.spacing( 14 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  more: {
    marginTop: theme.spacing( 2 )
  }
} ) );

function Hero () {

  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container className={classes.heroContent}>
        <img
          className={classes.image}
          srcSet="/img/max/640/pen-1215435_640.jpg 640w,
            /img/max/1280/pen-1215435_1280.jpg 1280w,
            /img/max/1920/pen-1215435_1920.jpg 1920w"
          sizes="(max-width: 700px) 640px,
            1280px,
            (min-width: 1800px) 1920px"
          src="/img/max/1280/pen-1215435_1280.jpg"
          alt="increase priority"/>
        <Typography color="inherit" align="center" variant="h3" marked="center">
          Virtual Office
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          href="/premium-themes/onepirate/sign-up/"
        >
          Register
        </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Discover the experience
        </Typography>
        <div className={classes.backdrop} />
        {/* <img
          className={classes.arrowDown}
          src="/static/themes/onepirate/productHeroArrowDown.png"
          height="16"
          width="12"
          alt="arrow down"
        /> */}
      </Container>
    </section>
  );
}

export default Hero;
