import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './servicos-relacionados.scss';

const ServicosRelacionados = () => (
  <FlexElement className={styles.wrapper}>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
  </FlexElement>
);

export default ServicosRelacionados;
