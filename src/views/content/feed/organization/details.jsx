import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Container, Feed } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';

const Details = () => (
  <Container fluid style={{ fontSize: '1rem' }}>
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

