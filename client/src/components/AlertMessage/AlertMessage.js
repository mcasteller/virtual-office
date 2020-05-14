import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/AppProvider/store';
import Alert from "@material-ui/lab/Alert";
import Collapse from '@material-ui/core/Collapse';

const DELAY = 2500;

function AlertMessage () {

  const [ state, actions ] = useContext( Context );

  const { alert } = state;

  useEffect( ()=>{
    setTimeout( ()=> {
      actions.clearAlert();
    }, DELAY )
  }, [ alert ] )

  return (
    <Collapse in={alert}>
      <Alert severity={alert && alert.severity} >
        {alert && alert.message}
      </Alert>
    </Collapse>
  )
}

export default AlertMessage;
