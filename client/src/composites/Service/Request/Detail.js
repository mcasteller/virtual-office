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
    // <div>
    // </div>
    <Container className={classes.container}>
      <Typography variant="h5" color="textPrimary" gutterBottom>
        Usted ha seleccionado el siguiente servicio:
      </Typography>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        {props.category.title}<br/>
        {props.category.description}
      </Typography>
      <Card className={classes.root}>
        <CardContent>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              address: '',
              phone: '',
              birthday: ''
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
              <Typography variant="h5" color="textPrimary">
                Datos de solicitud:
              </Typography>
              <TextInput
                label="Categoria"
                name="category"
                type="text"
                variant="outlined"
              />
              <TextInput
                label="Titulo"
                name="name"
                type="text"
                variant="outlined"
              />
              <TextInput
                label="Descripcion"
                name="description"
                type="text"
                multiline
                rows={5}
                variant="outlined"
              />
              <TextInput
                label="Comentarios"
                name="comments"
                type="text"
                multiline
                rows={10}
                variant="outlined"
              />
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
        </CardContent>
      </Card>
    </Container>

  )
}

RequestDetail.propTypes = {
  category: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
}
