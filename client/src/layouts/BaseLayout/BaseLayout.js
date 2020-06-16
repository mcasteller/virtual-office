import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'

export default function Page ( props ) {

  // Styles
  const useStyles =  makeStyles( ( theme ) => ( {
    content: {
      flex: '1 0 auto'
    }
  } ) )

  const classes = useStyles();

  return (
    <>
      <Header />
      <Container
        className={classes.content}
        maxWidth="lg"
      >
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </Container>
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired
}

