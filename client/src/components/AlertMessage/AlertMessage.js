import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert ( props ) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles( ( theme ) => ( {
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing( 2 )
    }
  }
} ) );

/*
** prop values
** alert : {
**  message: 'text to show'
**  severity: [ 'error', 'warning', 'info', 'success']
** }
*/
export default function AlertMessage ( props ) {
  const classes = useStyles();
  const [ open, setOpen ] = React.useState( true );

  const handleClose = ( event, reason ) => {
    if ( reason === 'clickaway' ) {
      return;
    }

    setOpen( false );
  };

  return props.alert ?
    (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical:'top', horizontal: 'center' }}
          open={props.alert && open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={props.alert.severity}>
            {props.alert.message}
          </Alert>
        </Snackbar>
      </div>
    ) : null;
}

AlertMessage.propTypes = {
  alert: PropTypes.object.isRequired
}

