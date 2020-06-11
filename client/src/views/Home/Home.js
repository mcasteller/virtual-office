import React from 'react';

import Hero from '../../composites/Hero/Hero';
import Values from '../../composites/Values/Values';
import HowItWorks from '../../composites/HowItWorks/HowItWorks';
import CTA from '../../composites/CTA/CTA';
import FAQ from '../../composites/FAQ/FAQ';
import MediaCard from '../../composites/Card/MediaCard';

function Home () {

  return (
    <>
      <Hero />
      <MediaCard />
      <HowItWorks />
      <CTA />
      <FAQ />
    </>
  );
}

export default Home;
