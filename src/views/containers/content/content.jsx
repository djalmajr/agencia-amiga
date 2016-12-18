import React from 'react';
import { Match } from 'react-router';
import FlexElement from '~/views/components/flex-element';
import Buscar from './buscar';
import Servico from './servico';
import Usuario from './usuario';
import styles from './content.scss';

const Content = () => (
  <FlexElement column full className={styles.content}>
    <Match pattern="/buscar" component={Buscar} />
    <Match pattern="/pessoas/:id" component={Usuario} />
    <Match pattern="/servicos/:id" component={Servico} />
  </FlexElement>
);

export default Content;
