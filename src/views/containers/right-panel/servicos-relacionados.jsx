import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexColumn from '~/views/components/flex-column';
import styles from './servicos-relacionados.scss';

const ServicosRelacionados = () => (
  <FlexColumn className={styles.wrapper}>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
  </FlexColumn>
);

export default ServicosRelacionados;
