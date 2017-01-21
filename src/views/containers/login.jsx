import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form, Icon } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import * as selectors from '~/store/selectors';
import * as actionCreators from '~/store/actions';

class Login extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isLogged: React.PropTypes.bool,
    isLogging: React.PropTypes.bool,
    location: React.PropTypes.object,
  };

  username = null;

  password = null;

  handleLogin = (evt, { username, password }) => {
    evt.preventDefault();

    const { actions, isLogging } = this.props;

    if (isLogging) {
      return;
    }

    if (username && password) {
      actions.login({ username, password });
    } else {
      actions.notifyError('Por favor, preencha todos os campos.');
    }
  };

  render() {
    const { isLogged, isLogging, location } = this.props;
    const { redirect = { pathname: '/' } } = location.state || {};

    if (isLogged) {
      return <Redirect to={redirect} />;
    }

    return (
      <FlexElement column full align="center" justify="center">
        <FlexElement column align="center">
          <Icon name="briefcase" color="blue" style={{ fontSize: '6em' }} />
          <span style={{ color: 'rgba(0,0,0,0.5)' }}>Agência Amiga</span>
        </FlexElement>
        <Form style={{ marginTop: 50, width: 300 }} onSubmit={this.handleLogin}>
          <FlexElement column>
            <Form.Input
              ref={el => (this.username = el)}
              type="text"
              name="username"
              disabled={isLogging}
              placeholder="Email"
            />
            <Form.Input
              ref={el => (this.password = el)}
              type="password"
              name="password"
              placeholder="Senha"
              disabled={isLogging}
            />
            <Button
              primary
              size="large"
              type="submit"
              style={{ margin: 0 }}
              loading={isLogging}
              disabled={isLogging}
            >
              <FlexElement align="center" justify="space-between">
                <span>{isLogging ? 'Autenticando...' : 'Entrar'}</span>
                <Icon name="sign in" />
              </FlexElement>
            </Button>
          </FlexElement>
        </Form>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: selectors.isAuthenticated(state),
  isLogging: selectors.isAuthenticating(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
