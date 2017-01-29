import React from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';

const style = {
  fontSize: '1rem',
  marginRight: '0.8em',
  width: '16em',
};

const Panel = () => (
  <FlexElement column style={style}>
    <Segment>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        PEDIDOS DE VOLUNTÁRIOS
      </Header>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        SERVIÇOS ABERTOS
      </Header>
    </Segment>
  </FlexElement>
);

Panel.propTypes = {
  skills: React.PropTypes.object,
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
  skills: selectors.getEntities(state, 'skills'),
});

export default connect(mapStateToProps)(Panel);
