import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Header, Label, Segment } from 'semantic-ui-react';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './panel.scss';

const Panel = ({ user }) => (
  <FlexElement column className={styles.wrapper}>
    <Segment>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        MINHAS HABILIDADES
      </Header>
      {_.map(user.skills, val =>
        <Label>
          {val.name}
        </Label>,
      )}
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        PROPOSTAS DE SERVIÇOS
      </Header>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        SERVIÇOS REALIZADOS
      </Header>
    </Segment>
  </FlexElement>
);

Panel.propTypes = {
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getuser(state),
});

export default connect(mapStateToProps)(Panel);
