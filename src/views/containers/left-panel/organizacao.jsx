import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './organizacao.scss';

const Organizacao = () => (
  <FlexElement column className={styles.organizacao}>
    <Segment>
      Organizacao
    </Segment>
  </FlexElement>
);

export default Organizacao;
