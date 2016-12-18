import React from 'react';
import FlexElement from '~/views/components/flex-element';
import TopBar from './topbar';
import Content from './content';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import styles from './main.scss';

const Main = props => (
  <FlexElement column className={styles.main}>
    <FlexElement>
      <TopBar />
    </FlexElement>
    <FlexElement full className={styles.content}>
      <LeftPanel {...props} />
      <Content />
      <RightPanel />
    </FlexElement>
  </FlexElement>
);

export default Main;
