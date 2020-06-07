import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Exmaple use
/* <Image
className={classes.img}
alt="request could not be processed"
src="/error.png" /> */

function Image ( props ) {

  const theme = useTheme();
  const isDownSmBreak = useMediaQuery( theme.breakpoints.down( 'sm' ) );

  function getSourceURI () {
    const { src } = props;

    const res = isDownSmBreak ?
      `/img/mobile${ src }`
      : `/img${ src }`

    return res;
  }

  return (
    <img
      src={getSourceURI()}
      alt={props.alt}
    />
  )
}

export default Image

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

