import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/CardContent';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Button } from '@material-ui/core';

import { Context } from '../../context/UserProfileProvider/store'
import { Context as GlobalContext } from '../../context/AppProvider/store'

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    padding: theme.spacing( 1, 1 )
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  form: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      width: '90%',
      margin: theme.spacing( 1 )
    },

    '& .MuiBox-root': {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: theme.spacing( 2, 0, 0, 0 ),

      '& button': {
        margin: theme.spacing( 1 )
      }
    }
  }
} ) );

function Profile ( props ) {
  const [ state, actions ] = useContext( Context );

  useEffect( () => {
    console.log( 'useeffect' )
    actions.getUserProfile();
  }, [] )

  // const [ globalState, globalActions ] = useContext( GlobalContext );

  // if ( state.alert ) {
  //   globalActions.alert( state.alert )

  //   // We need to clear the alert
  //   actions.clearAlert();
  // }

  // Variables
  const personFields = [
    {
      label: "Name",
      value: state.user.displayName
    },
    {
      label: "Address",
      value: state.user.address
    },
    {
      label: "Phone",
      value: state.user.phone
    },
    {
      label: "Date of birth",
      value: state.user.birthdate
    }
  ]

  const classes = useStyles();

  function handleSubmit () {
    actions.updateUser()
  }

  function generateListItems () {
    return personFields.map( field => (
      <ListItem key={field}>
        <ListItemText
          primary={`${ field.label }:`}
          secondary={field.value}
        />
      </ListItem>
    ) )
  }

  return (
    <>
      <h2>Profile</h2>
      <Card className={classes.root} variant="outlined">
        <form
          className={classes.form}
          onSubmit={handleSubmit}>
          <h3>Personal info</h3>
          <List dense="true">
            {generateListItems()}
          </List>
          {/* <TextField error label="Name" value={state.user.name}/>
          <TextField label="Address" value={state.user.address}/>
          <TextField label="Phone" value={state.user.phone}/>
          <TextField label="Date of birth" value={state.user.birthdate}/> */}
          <Box>
            <Button
              className={classes.margin}
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
            >
            Save
            </Button>
            <Button variant="text" size="medium" color="primary" className={classes.margin}>
            Cancel
            </Button>
          </Box>
        </form>
      </Card>
    </>
  )
}

export default Profile;

