import React from 'react';

import Hero from '../../composites/Hero/Hero';
import FAQList from '../../composites/FAQList/FAQList';
import CTA from '../../composites/CTA/CTA';

function FAQ () {

  //TODO: add contact us link at the end of every page
  return (
    <>
      <CTA />
      <FAQList />
    </>
  );
}

export default FAQ;
