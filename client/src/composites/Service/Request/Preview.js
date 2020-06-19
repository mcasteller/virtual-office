import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles( ( theme ) => ( {
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing( 3, 0 )
  },
  grid: {
    margin: theme.spacing( 4, 0 ),
    display: 'flex'
  },
  section: {
    color: theme.palette.common.blackZ,
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }
} ) );

export default function RequestPreview ( props ) {

  const classes = useStyles();

  return (
    // <div>
    // </div>
    <Container className={classes.container}>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {/* {props.service.title}<br/> */}
        {/* {props.service.description} */}
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Solicitante
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            nombre:
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            nombre:
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            nombre:
          </Typography>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Solicitud
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            nombre:
          </Typography>
        </CardContent>
      </Card>
    </Container>

  )
}

RequestPreview.propTypes = {
  category: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
}
