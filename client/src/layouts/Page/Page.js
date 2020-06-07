import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'

export default function Page ( props ) {

  // Styles
  const useStyles =  makeStyles( ( theme ) => ( {
    content: {
      flex: '1 0 auto',
      padding: theme.spacing( 3, 0 ),
      backgroundColor: theme.palette.grey[ 100 ]
    }
  } ) )

  const classes = useStyles();

  return (
    <>
      <Header />
      <Box className={classes.content}>
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </Box>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired
}

