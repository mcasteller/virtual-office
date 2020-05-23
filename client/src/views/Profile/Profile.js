import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    minWidth: 275,
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

function Profile () {

  const classes = useStyles();

  return (
    <>
      <h2>Profile</h2>
      <Card className={classes.root} variant="outlined">
        <form className={classes.form}>
          <h3>Personal info</h3>
          <TextField label="Name" />
          <TextField label="Email" />
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
