import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

import history from '../../history';
import Image from '../../components/Image/Image';

function Error () {

  const useStyles = makeStyles( ( theme ) => ( {
    root: {
      margin: theme.spacing( 0, 3 ),
      '& .MuiAlert-icon': {
        margin: '0.83em'
      }
    }
  } ) );

  const classes = useStyles();

  function onLinkClicked () {
    history.push( "/" );
  }

  return (
    <>
      <Alert
        className={classes.root}
        severity="error">
        <h2>
          There was an error processing your request.<br/>
          Please try again later.
        </h2>
        <Link href="#" onClick={onLinkClicked} >
          Go home
        </Link>
      </Alert>
    </>
  )
}

export default Error;
