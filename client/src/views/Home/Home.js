import React from 'react';

import Hero from '../../composites/Hero/Hero';
import Values from '../../composites/Values/Values';
import HowItWorks from '../../composites/HowItWorks/HowItWorks';
import CTA from '../../composites/CTA/CTA';
import FAQ from '../../composites/FAQ/FAQ';
import CardList from '../../composites/Card/CardList';

const cardContent = [
  {
    title: 'Contratos',
    description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
    image: '/img/legalCard-1.jpg',
    buttonLink: '/servicios',
    buttonLabel: 'Mas'
  },
  {
    title: 'Contratos',
    description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
    image: '/img/legalCard-2.jpg',
    buttonLink: '/servicios',
    buttonLabel: 'Mas'
  },
  {
    title: 'Contratos',
    description: 'Este texto es una description de uno de los servicios brindados por el equipo de trabajo',
    image: '/img/legalCard-3.jpg',
    buttonLink: '/servicios',
    buttonLabel: 'Mas'
  }
]

function Home () {

  return (
    <>
      <Hero />
      <CardList
        title="Nuestros Servicios"
        cardContent={cardContent} />
      <HowItWorks />
      <CTA />
      <FAQ />
    </>
  );
}

export default Home;
