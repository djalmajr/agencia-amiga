import React from 'react';
import { Match } from 'react-router';
import FlexElement from '~/views/components/flex-element';
import Buscar from './buscar';
import Campanha from './campanha';
import Organizacao from './organizacao';
import Servico from './servico';
import Usuario from './usuario';

const Content = () => (
  <FlexElement column full>
    <Match pattern="/buscar" component={Buscar} />
    <Match pattern="/campanhas/:id" component={Campanha} />
    <Match pattern="/organizacoes/:id" component={Organizacao} />
    <Match pattern="/pessoas/:id" component={Usuario} />
    <Match pattern="/servicos/:id" component={Servico} />
  </FlexElement>
);

export default Content;
