import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import CTALayout from './CTALayout';

const useStyles = makeStyles( ( theme ) => ( {
  button: {
    width: '200px'
  },
  description: {
    margin: theme.spacing( 4, 0 )
  },
  section: {
    display: 'flex',
    overflow: 'hidden'
  },
  container: {
    margin: theme.spacing( 10, 0 ),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
} ) );

function CTA ( props ) {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Container className={classes.container}>
        <CTALayout>
          <Typography className={classes.title} variant="h4" marked="center" component="h2">
            Contacto
          </Typography>
          <Typography
            className={classes.description}
            variant="h5"
          >
            Estamos a un click de distancia, complete el formulario para consultas
            respecto a los servicios brindados.
          </Typography>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            className={classes.button}
          >
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              Contactenos
            </Link>
          </Button>
        </CTALayout>
      </Container>
    </section>
  );
}

export default CTA;
