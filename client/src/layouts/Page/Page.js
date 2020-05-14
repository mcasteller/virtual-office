import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'
import AlertMessage from '../../components/AlertMessage/AlertMessage';

export default function Page ( props ) {

  return (
    <React.Fragment>
      <Header />
      <AlertMessage />
      <ErrorBoundary>
        {props.children}
      </ErrorBoundary>
      <Footer />
    </React.Fragment>
  );
}

Page.propTypes = {
  children: PropTypes.element.isRequired
}

