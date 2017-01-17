import React from 'react';
import { Match } from 'react-router';
import FlexElement from '~/views/components/flex-element';
import Buscar from './buscar';
import Campanha from './campanha';
import Organizacao from './organizacao';
import Servico from './servico';
import Usuario from './usuario';

const Content = () => (
  <FlexElement column>
    <Match pattern="/buscar" component={Buscar} />
    <Match pattern="/campanhas" component={Campanha} />
    <Match pattern="/organizacoes" component={Organizacao} />
    <Match pattern="/pessoas" component={Usuario} />
    <Match pattern="/servicos" component={Servico} />
  </FlexElement>
);

export default Content;
