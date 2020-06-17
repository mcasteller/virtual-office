import React from 'react';
import _ from 'lodash';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { TextInput } from '../../../components/FormField/FormField';

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

  // functions
  function onSubmit ( values, { setSubmitting } ) {
    const data = _.pick( values, [
      'firstName',
      'lastName',
      'address',
      'phone',
      'birthDate'
    ] );

    setSubmitting( false );

    props.handleNext( data );
  }

  return (
    // <div>
    // </div>
    <Container className={classes.container}>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Usted ha solicitado el siguiente servicio:
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {/* {props.service.title}<br/> */}
        {/* {props.service.description} */}
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            nombre:
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
