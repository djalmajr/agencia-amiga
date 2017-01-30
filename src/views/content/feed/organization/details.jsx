import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Segment, Container, Menu } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
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

const Details = ({ active, onTabClick }) => {
  const Component = views[active].component;

  return (
    <Container fluid style={{ fontSize: '1rem' }}>
      <Menu attached="top" tabular>
        {_.map(views, (val, key) =>
          <Menu.Item
            key={key}
            name={key}
            active={active === key}
            onClick={onTabClick}
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
};

Details.propTypes = {
  active: React.PropTypes.string,
  onTabClick: React.PropTypes.func,
};

const mapStateToProps = state => ({
  active: selectors.getCurrentTabFeed(state),
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (evt, { name }) => dispatch(actionCreators.updateTabFeed(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

