import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing( 9 ),
    marginBottom: theme.spacing( 9 )
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing( 2, 5 )
  },
  link: {
    marginTop: theme.spacing( 3 ),
    marginBottom: theme.spacing( 3 )
  },
  buoy: {
    width: 60
  }
} ) );

function FAQ ( props ) {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="section">
      <Button className={classes.button}>
        <Typography variant="h4" component="span">
          <Link to="/faq">
            Got any questions? Need help?
          </Link>
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        We are here to help. Get in touch!
      </Typography>
      <img src="/icons/businessman.svg" className={classes.buoy} alt="buoy" />
    </Container>
  );
}

export default FAQ;
