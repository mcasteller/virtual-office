import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    margin: theme.spacing( 0, 'auto' )
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

export default function CardList ( props ) {
  const classes = useStyles();

  return (
    <section
      className={classes.section}>
      <Container className={classes.container}>
        {props.title &&
        <Typography
          className={classes.title}
          variant="h4"
          marked="center"
          component="h2"
        >
          {props.title}
        </Typography>
        }
        <Grid
          className={classes.grid}
          container
          justify="space-evenly"
        >
          {props.cardContent.map( ( item ) => {
            return (
              <Grid
                className={classes.gridItem}
                item xs={12} sm={props.sm || 4} key={item.title}>
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

CardList.propTypes = {
  title: PropTypes.string,
  cardContent: PropTypes.array.isRequired,
  sm: PropTypes.number
}
