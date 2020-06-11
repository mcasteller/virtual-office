import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    margin: theme.spacing( 10, 0 ),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing( 0, 5 )
  },
  title: {
    marginBottom: theme.spacing( 12 )
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.dark,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing( 4 ),
    marginBottom: theme.spacing( 4 )
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing( 12 ),
    minWidth: '200px'
  }
} ) );

function HowItWorks ( props ) {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Como funciona
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src="/icons/interview.svg"
                  alt="interview"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Agendamos un encuentro virtual.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src="/icons/pay.svg"
                  alt="pay for service"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Se efectua el pago en funcion de los servicios solicitados.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src="/icons/team.svg"
                  alt="team process request"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Nuestro equipo procesa las tareas.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>4.</div>
                <img
                  src="/icons/contract.svg"
                  alt="generate contract"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Se efectua la entrega de la documentacion.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/premium-themes/onepirate/sign-up/"
        >
          Comenzar
        </Button>
      </Container>
    </section>
  );
}

export default HowItWorks;
