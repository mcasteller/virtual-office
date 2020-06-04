import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextInput } from '../../components/FormField/FormField';
import { Button } from '@material-ui/core';

function ProfileDialog ( props ) {

  // styles
  const useStyles = makeStyles( ( theme ) => ( {
    dialogContent: {
      padding: theme.spacing( 0, 3, 3, 3 )
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing( 3, 3, 0, 3 )
    },
    formActions: {
      padding: theme.spacing( 4, 0, 0, 0 )
    }
  } ) );

  const classes = useStyles();

  // functions
  function onCancel () {
    props.setOpen( false );
  }

  function onSubmit ( values, { setSubmitting } ) {
    // TODO: add submit logic
    const data = _.pick( values, [ 'firstName', 'lastName', 'address', 'phone', 'birthDate' ] );

    props.updateUser( data );

    setSubmitting( false );

    props.setOpen( false );
  }

  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Use form fields to update your profile information.
        </DialogContentText>
        <Formik
          initialValues={{
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            address: props.user.address,
            phone: props.user.phone,
            birthday: props.user.birthday
          }}
          validationSchema={Yup.object( {
            name: Yup.string()
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
            <DialogActions className={classes.formActions}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Send
              </Button>
              <Button color="primary" onClick={onCancel}>
                Cancel
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

ProfileDialog.propTypes = {
  user: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

export default ProfileDialog;
