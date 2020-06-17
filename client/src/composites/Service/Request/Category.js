import React from 'react';

export default function Category ( props ) {

  return (
    <div>
      <p>Usted ha seleccionado el siguiente servicio:</p>
      <p>{props.category.title}</p>
      <p>{props.category.description}</p>
    </div>
  )
}
