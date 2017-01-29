import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Container, Menu } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import Timeline from './tabs/timeline';
import Campaigns from './tabs/campaigns';
import Services from './tabs/services';

const views = {
  timeline: {
    description: 'Feed',
    component: Timeline,
  },
  campaigns: {
    description: 'Campanhas',
    component: Campaigns,
  },
  services: {
    description: 'Serviços',
    component: Services,
  },
};

class Details extends React.Component {
  state = {
    activeItem: 'timeline',
  };

  handleTabClick = (evt, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    const Component = views[activeItem].component;

    return (
      <Container fluid style={{ fontSize: '1rem' }}>
        <Menu attached="top" tabular>
          {_.map(views, (val, key) =>
            <Menu.Item
              key={key}
              name={key}
              active={activeItem === key}
              onClick={this.handleTabClick}
            >
              {val.description}
            </Menu.Item>,
          )}
        </Menu>
        <Segment attached="bottom">
          <Component />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state, { params: { id } }) => ({
  user: selectors.getEntities(state, 'users', id),
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

