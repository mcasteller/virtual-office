import React from 'react';
import _ from 'lodash';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  },
  section: {
    color: theme.palette.common.blackZ,
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  commentsBox: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing( 4, 0 )
  },
  serviceDetail: {
  },
  serviceRequestContainer: {
    '& .MuiCardContent-root': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  serviceDetailContainer: {
    margin: theme.spacing( 4, 0 )
  }
} ) );

export default function RequestDetail ( props ) {

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
    <Formik
      initialValues={{
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        address: '',
        phone: '',
        title: props.category.title,
        description: props.category.description
      }}
      validationSchema={Yup.object( {
        firstName: Yup.string()
          .max( 20, 'Must be 20 characters or less' )
          .required( 'Required' ),
        lastName: Yup.string()
          .max( 20, 'Must be 20 characters or less' )
          .required( 'Required' ),
        phone: Yup.number()
          .positive()
      } )}
      onSubmit={onSubmit}
    >
      <Form className={classes.form}>
        <Card className={classes.serviceRequestContainer}>
          <CardContent>
            <Typography variant="h5" color="textPrimary">
                  Datos solicitante:
            </Typography>
            <TextInput
              label="Nombre"
              name="firstName"
              type="text"
            />
            <TextInput
              label="Apellido"
              name="lastName"
              type="text"
            />
            <TextInput
              label="Direccion"
              name="address"
              type="text"
            />
            <TextInput
              shrink="true"
              label="Telefono"
              name="phone"
              type="tel"
            />
          </CardContent>
        </Card>
        <Card className={classes.serviceDetailContainer}>
          <CardContent>
            <Typography
              variant="h5"
              color="textPrimary">
                    Datos de solicitud:
            </Typography>
            <Typography
              className={classes.serviceDetail}
              variant="h6"
              color="textPrimary">
              {props.category.title}
            </Typography>
            <Typography
              className={classes.serviceDetail}
              variant="h6"
              color="textPrimary">
              {props.category.description}
            </Typography>
            <Box className={classes.commentsBox}>
              <Typography variant="h7" color="textPrimary">
                    A continuacion puede adjuntar informacion adicional que sera remitida junto
                    a la solicitud del servicio en cuestion.
              </Typography>
              <TextInput
                name="comments"
                type="text"
                multiline
                rows={10}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
        <Grid
          className={classes.grid}>
          <Button
            color="inherit"
            onClick={props.handleBack}
          >
                    Anterior
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
                    Siguiente
          </Button>
        </Grid>
      </Form>
    </Formik>
  )
}

RequestDetail.propTypes = {
  user: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
}
