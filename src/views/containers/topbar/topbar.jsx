import React from 'react';
import FlexElement from '~/views/components/flex-element';
import TopBarSearch from './topbar-search';
import TopBarUser from './topbar-user';
import styles from './topbar.scss';

const TopBar = () => (
  <FlexElement className={styles.topBar}>
    <FlexElement className={styles.column} style={{ fontSize: '1.2em' }}>
      <i className={`fa fa-briefcase ${styles.logo}`} />
      <span>Agência Amiga</span>
    </FlexElement>
    <FlexElement full className={styles.column}>
      <TopBarSearch />
    </FlexElement>
    <FlexElement className={styles.column}>
      <TopBarUser />
    </FlexElement>
  </FlexElement>
);

export default TopBar;
