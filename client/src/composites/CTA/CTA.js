import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CTALayout from './CTALayout';

const useStyles = makeStyles( ( theme ) => ( {
  button: {
    width: '100%'
  }
} ) );

function CTA ( props ) {
  const classes = useStyles();

  return (
    <CTALayout>
      <Typography variant="h2" component="h2" gutterBottom>
        Receive offers
      </Typography>
      <Typography variant="h5">
        Taste the holidays of the everyday close to home.
      </Typography>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
      >
        <Link to="/contact">
          Contact Us
        </Link>
      </Button>
    </CTALayout>
  );
}

export default CTA;
