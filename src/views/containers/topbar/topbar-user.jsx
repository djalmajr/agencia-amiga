import React from 'react';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import defaultUserImage from './user.png';
import SettingsModal from './topbar-settings';
import styles from './topbar-user.scss';

const requiredFields = ['name', 'state', 'city', 'skills'];

class TopBarUser extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSettingsVisible: requiredFields
        .map(attr => props.user[attr])
        .some(val => isEmpty(val)),
    };
  }

  handleSettingsToggle = () => {
    this.setState({ isSettingsVisible: !this.state.isSettingsVisible });
  };

  handleLogout = (evt) => {
    evt.preventDefault();

    this.props.actions.logout();
  };

  render() {
    const settingsProps = {
      requiredFields,
      user: this.props.user,
      isOpen: this.state.isSettingsVisible,
      onClose: this.handleSettingsToggle,
    };

    const trigger = (
      <FlexElement align="center" justify="center">
        <Image avatar src={defaultUserImage} />
        <Icon name="caret down" style={{ marginLeft: '0.3em' }} />
      </FlexElement>
    );

    return (
      <FlexElement align="center" justify="flex-end" className={styles.topBarUser}>
        <Icon name="alarm outline" style={{ marginRight: '1em' }} />
        <Icon name="mail outline" style={{ marginRight: '1em' }} />
        <Dropdown icon={null} trigger={trigger} pointing="top right">
          <Dropdown.Menu>
            <Dropdown.Item text="Configurações" icon="settings" onClick={this.handleSettingsToggle} />
            <Dropdown.Item text="Sair" icon="sign out" onClick={this.handleLogout} />
          </Dropdown.Menu>
        </Dropdown>
        <SettingsModal {...settingsProps} />
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBarUser);
