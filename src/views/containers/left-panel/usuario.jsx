import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './usuario.scss';

const Usuario = () => (
  <FlexElement column className={styles.usuario}>
    <Segment>
      Usuario
    </Segment>
  </FlexElement>
);

export default Usuario;
