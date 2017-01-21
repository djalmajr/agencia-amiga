import React from 'react';
import { Icon } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import TopBarSearch from './topbar-search';
import TopBarUser from './topbar-user';
import styles from './topbar.scss';

const TopBar = () => (
  <FlexElement className={styles.topBar}>
    <FlexElement className={styles.column} style={{ fontSize: '1.2em' }}>
      <Icon name="travel" className={styles.logo} />
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
