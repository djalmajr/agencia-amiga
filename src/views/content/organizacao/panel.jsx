import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './panel.scss';

const Panel = () => (
  <FlexElement column className={styles.wrapper}>
    <Segment>
      Organizacao
    </Segment>
  </FlexElement>
);

export default Panel;
