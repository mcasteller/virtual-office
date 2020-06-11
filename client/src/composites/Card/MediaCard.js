import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles( theme => ( {
  root: {
    maxWidth: 345,
    margin: theme.spacing( 0, 'auto' ),
  },
  container: {
    margin: theme.spacing( 10, 0 ),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  gridItem: {
    padding: theme.spacing( 4, 0 )
  },
  media: {
    height: 140
  },
  section: {},
  title: {
    marginBottom: theme.spacing( 10 )
  }
} ) );

export default function MediaCard () {
  const classes = useStyles();

  const cardContent = [
    {
      title: 'Contratos',
      description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
      image: '/img/legalCard-1.jpg',
      buttonLink: '/servicios',
      buttonLabel: 'Mas'
    },
    {
      title: 'Contratos',
      description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
      image: '/img/legalCard-2.jpg',
      buttonLink: '/servicios',
      buttonLabel: 'Mas'
    },
    {
      title: 'Contratos',
      description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
      image: '/img/legalCard-3.jpg',
      buttonLink: '/servicios',
      buttonLabel: 'Mas'
    }
  ]

  return (
    <section
      className={classes.section}>
      <Container className={classes.container}>
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Nuestros Servicios
        </Typography>
        <Grid
          className={classes.grid}
          container
          justify="space-evenly"
        >
          {cardContent.map( ( item ) => {
            return (
              <Grid
                className={classes.gridItem}
                item xs={12} sm={3} key={item.title}>
                <Card
                  className={classes.root}
                  key={item.title}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={item.image}
                      title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to={item.buttonLink} >
                      <Button size="small" color="primary">
                        {item.buttonLabel}
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            )
          } )}
        </Grid>
      </Container>
    </section>
  );
}
