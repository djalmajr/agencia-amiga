import React from 'react';
import Page from '../../components/three-columns';
import Panel from './panel';
import Details from './details';
import Related from './related';

const Usuario = props => (
  <Page
    panel={<Panel {...props} />}
    content={<Details {...props} />}
    related={<Related {...props} />}
  />
);

export default Usuario;
