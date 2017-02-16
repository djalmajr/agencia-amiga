import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import Search from './search';
import User from './user';

const styles = {
  topBar: {
    backgroundColor: '#2987CD',
    color: 'white',
    fontSize: '1rem',
    padding: '0.4em 0.4em 0.5em 1em',
    width: '100%',
  },
  logo: {
    fontSize: '1.3em',
    marginRight: '0.5em',
    marginTop: '0.1em',
  },
};

const TopBar = () => (
  <FlexElement style={styles.topBar}>
    <FlexElement align="center">
      <Icon name="travel" style={styles.logo} />
      <Link to="/" style={{ color: 'white' }}>Agência Amiga</Link>
    </FlexElement>
    <FlexElement full column align="center">
      <Search />
    </FlexElement>
    <FlexElement column align="center" justify="center">
      <User />
    </FlexElement>
  </FlexElement>
);

export default TopBar;
