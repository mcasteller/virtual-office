import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

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

  const [ globalState, globalActions ] = useContext( GlobalContext );

  if ( state.alert ) {
    globalActions.alert( state.alert )

    // We need to clear the alert
    actions.clearAlert();
  }

  const classes = useStyles();

  return (
    <>
      <h2>Profile</h2>
      <Card className={classes.root} variant="outlined">
        <form className={classes.form}>
          <h3>Personal info</h3>
          <TextField label="Name" value={state.user.name}/>
          <TextField label="Email" value={state.user.email} />
          <TextField label="Address" />
          <Box>
            <Button variant="contained" size="medium" color="primary" className={classes.margin}>
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

