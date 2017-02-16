import React from 'react';
import faker from 'faker';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Container, Image, Segment } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import Timeline from './timeline';

const srcImg = 'http://xpenology.org/wp-content/themes/qaengine/img/default-thumbnail.jpg';

const style = {
  fontSize: '1rem',
};

const Details = () => (
  <Container fluid style={style}>
    <Card fluid>
      <Card.Content>
        <Image floated="left" size="small" src={srcImg} />
        <Card.Header style={{ fontSize: '1em', marginBottom: '0.3em' }}>
          NOME DA CAMPANHA
        </Card.Header>
        <Card.Meta>
          {faker.lorem.paragraph(4)}
        </Card.Meta>
      </Card.Content>
    </Card>
    <Segment attached="bottom">
      <Timeline />
    </Segment>
  </Container>
);

const mapStateToProps = state => ({
  skills: selectors.getEntities('skills')(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details));

