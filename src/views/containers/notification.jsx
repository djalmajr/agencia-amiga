import React from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import selectors from '~/store/selectors';

class NotificationContainer extends React.PureComponent {
  static propTypes = {
    notification: React.PropTypes.object,
  };

  componentWillReceiveProps({ notification }) {
    if (notification.level) {
      this.el.addNotification(notification);
    }
  }

  render() {
    return (
      <NotificationSystem ref={el => (this.el = el)} />
    );
  }
}

const mapStateToProps = state => ({
  notification: selectors.getNotification(state),
});

export default connect(mapStateToProps)(NotificationContainer);
