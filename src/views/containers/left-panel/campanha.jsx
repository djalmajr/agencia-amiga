import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './campanha.scss';

const Campanha = () => (
  <FlexElement column className={styles.campanha}>
    <Segment>
      Campanha
    </Segment>
  </FlexElement>
);

export default Campanha;
