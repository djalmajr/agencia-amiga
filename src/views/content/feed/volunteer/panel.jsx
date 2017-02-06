import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Header, Label, Segment } from 'semantic-ui-react';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';

const style = {
  fontSize: '1rem',
  marginRight: '0.8em',
  width: '16em',
};

const Panel = ({ skills, user }) => (
  <FlexElement column style={style}>
    <Segment>
      <Header as="h5" style={{ fontSize: '0.95em' }}>
        MINHAS HABILIDADES
      </Header>
      {_.keys(user.skills, key =>
        <Label key={key}>
          {skills[key].name}
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
  skills: React.PropTypes.object,
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  skills: selectors.getEntities(state, 'skills'),
});

export default connect(mapStateToProps)(Panel);
