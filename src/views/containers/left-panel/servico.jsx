import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './servico.scss';

const Servico = () => (
  <FlexElement column className={styles.servico}>
    <Segment>
      Servico
    </Segment>
  </FlexElement>
);

export default Servico;
