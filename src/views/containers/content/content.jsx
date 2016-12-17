import React from 'react';
import { Match } from 'react-router';
import FlexColumn from '~/views/components/flex-column';
import Buscar from './buscar';
import Servico from './servico';
import Usuario from './usuario';
import styles from './content.scss';

const Content = () => (
  <FlexColumn full className={styles.content}>
    <Match pattern="/buscar" component={Buscar} />
    <Match pattern="/servicos/:id" component={Servico} />
    <Match pattern="/usuarios/:id" component={Usuario} />
  </FlexColumn>
);

export default Content;
