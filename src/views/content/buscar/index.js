import React from 'react';
import Page from '../../components/three-columns';
import Filters from './filters';
import Results from './results';

const Buscar = props => (
  <Page
    panel={<Filters {...props} />}
    content={<Results {...props} />}
  />
);

export default Buscar;
