import React from 'react';

import Hero from '../../composites/Hero/Hero';
import FAQList from '../../composites/FAQList/FAQList';
import CTA from '../../composites/CTA/CTA';
import LabelHero from '../../composites/Hero/LabelHero';

function FAQ () {

  //TODO: add contact us link at the end of every page
  return (
    <>
      <LabelHero
        title="Preguntas frecuentes"
        description="Listado de preguntas frecuentes organizadas segun tema."
        color='black'
      />
      <FAQList />
      <CTA />
    </>
  );
}

export default FAQ;
