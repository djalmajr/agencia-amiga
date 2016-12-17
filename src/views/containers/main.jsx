import React from 'react';
import FlexColumn from '~/views/components/flex-column';
import FlexRow from '~/views/components/flex-row';
import TopBar from './topbar';
import Content from './content';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import styles from './main.scss';

const Main = props => (
  <FlexColumn className={styles.main}>
    <FlexRow>
      <TopBar />
    </FlexRow>
    <FlexRow full className={styles.content}>
      <LeftPanel {...props} />
      <Content />
      <RightPanel />
    </FlexRow>
  </FlexColumn>
);

export default Main;
