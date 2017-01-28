import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '~/store/selectors';
import Organization from './organization';
import Volunteer from './volunteer';

const Feed = ({ user, ...props }) => (
  user.type === 'organization' ?
    <Organization {...props} /> :
    <Volunteer {...props} />
);

Feed.propTypes = {
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

export default connect(mapStateToProps)(Feed);
