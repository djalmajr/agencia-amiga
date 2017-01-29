import React from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';

const Related = () => (
  <FlexElement column style={{ marginLeft: '0.8em', width: '16em' }}>
    <Segment>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        SERVIÇOS DE INTERESSE
      </Header>
    </Segment>
  </FlexElement>
);

Related.propTypes = {
  skills: React.PropTypes.object,
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
  skills: selectors.getEntities(state, 'skills'),
});

export default connect(mapStateToProps)(Related);
