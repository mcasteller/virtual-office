import React from 'react';

import Hero from '../../composites/Hero/Hero';
import ServiceValues from '../../composites/ServiceValues/ServiceValues';
import HowItWorks from '../../composites/HowItWorks/HowItWorks';
import CTA from '../../composites/CTA/CTA';
import FAQ from '../../composites/FAQ/FAQ';

function Home () {

  return (
    <>
      <Hero />
      <ServiceValues />
      <HowItWorks />
      <CTA />
      <FAQ />
    </>
  );
}

export default Home;
