import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/CardContent';
import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { Context } from '../../context/UserProfileProvider/store'
import { Context as GlobalContext } from '../../context/AppProvider/store'
import ProfileDialog from './ProfileDialog';
import AlertMessage from '../../components/AlertMessage/AlertMessage';

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    padding: theme.spacing( 1, 1 ),
    position: 'relative'
  },
  dialogContent: {
    padding: theme.spacing( 3 )
  },
  editBtn: {
    position: 'absolute',
    bottom: theme.spacing( 1 ),
    right: theme.spacing( 1 )
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

  // hooks
  const [ open, setOpen ] = useState( false );

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
      label: "First name",
      value: state.user.firstName
    },
    {
      label: "Last name",
      value: state.user.lastName
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
      value: state.user.birthDate
    }
  ]

  const classes = useStyles();

  // functions
  function onEditBtnClick () {
    setOpen( true );
  }

  function updateUser ( data ) {
    actions.updateUserProfile( data )
  }

  // renders
  function generateListItems () {
    return personFields.map( ( field, index ) => (
      <ListItem key={index}>
        <ListItemText
          primary={`${ field.label }:`}
          secondary={field.value}
        />
      </ListItem>
    ) )
  }

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <h2>Personal info</h2>
        <List dense={true}>
          {generateListItems()}
        </List>
        <IconButton
          className={classes.editBtn}
          onClick={onEditBtnClick} >
          <EditOutlinedIcon />
        </IconButton>
      </Card>

      <ProfileDialog
        open={open}
        user={state.user}
        setOpen={setOpen}
        updateUser={updateUser} />

      <AlertMessage alert={state.alert} />
    </>
  )
}

export default Profile;

