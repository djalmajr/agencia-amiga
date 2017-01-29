import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  static propTypes = {
    actions: React.PropTypes.object,
    // hasServices: React.PropTypes.bool,
  };

  state = {
    activeItem: 'timeline',
  };

  componentDidMount() {
    this.fetchServices(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchServices(props);
  }

  fetchServices({ hasServices, isLogged, isFetchingServices }) {
    if (!hasServices && isLogged && !isFetchingServices) {
      this.props.actions.read({ entity: 'services' });
    }
  }

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

const mapStateToProps = state => ({
  isLogged: selectors.isAuthenticated(state),
  hasServices: !_.isEmpty(selectors.getEntities(state, 'services')),
  isFetchingServices: selectors.isFetching(state, 'services'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

