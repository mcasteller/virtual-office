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
  icon: {
    width: 60
  }
} ) );

function FAQ ( props ) {
  const classes = useStyles();

  return (
    <Container className={classes.root} component="section">
      <Link
        className={classes.button}
        to="/faq"
      >
        <Typography variant="h4" component="span">
            Preguntas frecuentes
        </Typography>
      </Link>
      <Typography variant="subtitle1" className={classes.link}>
        Recuerde que estamos siempre a su disposicion.
      </Typography>
      <img src="/icons/businessman.svg" className={classes.icon} alt="icon help" />
    </Container>
  );
}

export default FAQ;
