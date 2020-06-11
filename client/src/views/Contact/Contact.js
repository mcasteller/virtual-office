import React from 'react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '../../components/FormField/FormField';

import LabelHero from '../../composites/Hero/LabelHero';

const useStyles = makeStyles( ( theme ) => ( {
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10vw'
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

function Contact () {

  const classes = useStyles();

  function onSubmit ( values, { setSubmitting } ) {
    const data = _.pick( values, [
      'firstName',
      'lastName',
      'address',
      'phone',
      'birthDate'
    ] );

    setSubmitting( false );
  }

  //TODO: add captcha validation
  return (
    <>
      <LabelHero
        title="Contacto"
        description="Complete los campos requeridos para que podamos ponernos en contacto."
        color='black'
      />
      <section className={classes.section}>
        <Container className={classes.container}>
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
              <TextInput
                label="First name"
                name="firstName"
                type="text"
              />
              <TextInput
                label="Last name"
                name="lastName"
                type="text"
              />
              <TextInput
                label="Address"
                name="address"
                type="text"
              />
              <TextInput
                label="Phone"
                name="phone"
                type="tel"
              />
              <TextInput
                label="Birthdate"
                name="birthDate"
                type="date"
              />
              <Grid
                className={classes.grid}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                Send
                </Button>
                <Button color="primary">
                Cancel
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </section>
    </>
  );
}

export default Contact;
