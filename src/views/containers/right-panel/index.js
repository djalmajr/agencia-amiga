import React from 'react';
import { Match } from 'react-router';
import Servicos from './servicos';

const RightPanel = () => (
  <div>
    <Match pattern="/buscar" component={() => <div />} />
    <Match pattern="/servicos/:id" component={Servicos} />
  </div>
);

export default RightPanel;
