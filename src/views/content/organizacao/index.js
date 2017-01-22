import React from 'react';
import Page from '../../components/three-columns';
import Panel from './panel';
import Details from './details';

const Organizacao = props => (
  <Page
    panel={<Panel {...props} />}
    content={<Details {...props} />}
  />
);

export default Organizacao;
