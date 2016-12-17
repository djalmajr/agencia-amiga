import React from 'react';
import { Match } from 'react-router';
import ServicosRelacionados from './servicos-relacionados';

const RightPanel = () => (
  <div>
    <Match pattern="/buscar" component={() => <div />} />
    <Match pattern="/servicos/:id" component={ServicosRelacionados} />
  </div>
);

export default RightPanel;
