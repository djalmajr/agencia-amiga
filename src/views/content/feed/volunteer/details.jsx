import React from 'react';
import faker from 'faker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Container, Feed, Image } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';

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
    <Card fluid>
      <Card.Content>
        <Card.Header style={{ fontSize: '1em' }}>
          FEED DE NOTÍCIAS
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          <Feed.Event>
            <Feed.Label image="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
            <Feed.Content>
              <Feed.Date content="1 day ago" />
              <Feed.Summary>
                You added <a>Jenny Hess</a> to your <a>coworker</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="http://semantic-ui.com/images/avatar2/small/molly.png" />
            <Feed.Content>
              <Feed.Date content="3 days ago" />
              <Feed.Summary>
                You added <a>Molly Malone</a> as a friend.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          <Feed.Event>
            <Feed.Label image="http://semantic-ui.com/images/avatar/small/elliot.jpg" />
            <Feed.Content>
              <Feed.Date content="4 days ago" />
              <Feed.Summary>
                You added <a>Elliot Baker</a> to your <a>musicians</a> group.
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card.Content>
    </Card>
  </Container>
);

const mapStateToProps = (state, { params: { id } }) => ({
  user: selectors.getEntities(state, 'users', id),
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

