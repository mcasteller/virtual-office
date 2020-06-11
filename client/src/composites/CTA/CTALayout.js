import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    marginTop: theme.spacing( 10 ),
    marginBottom: 0,
    display: 'flex'
  },
  cardWrapper: {
    zIndex: 1
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.warning.light,
    padding: theme.spacing( 8, 3 )
  },
  imagesWrapper: {
    position: 'relative'
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600
  }
} ) );

function CTALayout ( props ) {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            {props.children}
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <img
              src="/img/contact.jpg"
              alt="contact us"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CTALayout;

CTALayout.propTypes = {
  children: PropTypes.element.isRequired
}
