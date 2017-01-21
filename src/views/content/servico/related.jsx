import React from 'react';
import { Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './related.scss';

const Related = () => (
  <FlexElement column className={styles.wrapper}>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
    <Segment>
      Pellentesque habitant morbi tristique senectus.
    </Segment>
  </FlexElement>
);

export default Related;
