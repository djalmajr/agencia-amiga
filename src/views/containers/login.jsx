import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Divider, Form, Icon, Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import * as selectors from '~/store/selectors';
import * as actionCreators from '~/store/actions';

class Login extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isLogged: React.PropTypes.bool,
    isLogging: React.PropTypes.bool,
    isRegistering: React.PropTypes.bool,
    location: React.PropTypes.object,
  };

  state = {
    type: 'volunteer',
  };

  handleChange = (evt, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLogin = (evt, { email, password }) => {
    evt.preventDefault();

    const { type } = this.state;
    const { actions, isLogging, isRegistering } = this.props;

    if (isLogging || isRegistering) {
      return;
    }

    if (email && password) {
      actions.login({ email, password, type });
    } else {
      actions.notifyError('Por favor, preencha todos os campos.');
    }
  };

  handleRegister = (evt) => {
    evt.preventDefault();

    const { type } = this.state;
    const { actions, isLogging, isRegistering } = this.props;

    if (isRegistering || isLogging) {
      return;
    }

    const email = this.el.querySelector('[name="email"]').value;
    const password = this.el.querySelector('[name="password"]').value;

    if (email && password) {
      actions.register({ email, password, type });
    } else {
      actions.notifyError('Por favor, preencha todos os campos.');
    }
  };

  render() {
    const { type } = this.state;
    const { isLogged, isLogging, isRegistering, location } = this.props;
    const { redirect = { pathname: '/' } } = location.state || {};

    if (isLogged) {
      return <Redirect to={redirect} />;
    }

    return (
      <FlexElement column full align="center" justify="center" innerRef={el => (this.el = el)}>
        <FlexElement column align="center">
          <Icon name="travel" color="blue" style={{ fontSize: '6em' }} />
          <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '1.3em' }}>Agência Amiga</span>
        </FlexElement>
        <Segment column align="center" as={FlexElement} style={{ marginTop: 30, width: 300 }}>
          <Form style={{ marginBottom: '1em', width: '100%' }} onSubmit={this.handleLogin}>
            <Form.Field>
              <label htmlFor>Login</label>
            </Form.Field>
            <Form.Input
              type="text"
              name="email"
              disabled={isLogging || isRegistering}
              placeholder="Email"
            />
            <Form.Input
              type="password"
              name="password"
              placeholder="Senha"
              disabled={isLogging || isRegistering}
            />
            <Button
              primary
              fluid
              size="large"
              type="submit"
              style={{ margin: 0 }}
              loading={isLogging}
              disabled={isLogging || isRegistering}
            >
              <FlexElement align="center" justify="space-between">
                <span>{isLogging ? 'Autenticando...' : 'Entrar'}</span>
                <Icon name="sign in" />
              </FlexElement>
            </Button>
          </Form>
          <Divider horizontal style={{ width: '100%' }}>ou</Divider>
          <Form style={{ marginTop: '1em', width: '100%' }} >
            <Form.Field>
              <label htmlFor>Cadastre-se como:</label>
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Checkbox
                radio
                name="type"
                label="Voluntário"
                value="volunteer"
                checked={type === 'volunteer'}
                disabled={isLogging || isRegistering}
                onChange={this.handleChange}
              />
              <Form.Checkbox
                radio
                name="type"
                label="Organização"
                value="organization"
                checked={type === 'organization'}
                disabled={isLogging || isRegistering}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
          <Button
            fluid
            size="large"
            style={{ margin: 0, marginTop: 10 }}
            loading={isRegistering}
            disabled={isLogging || isRegistering}
            onClick={this.handleRegister}
          >
            <FlexElement align="center" justify="space-between">
              <span>{isRegistering ? 'Registrando...' : 'Registrar'}</span>
              <Icon name="signup" style={{ margin: 0 }} />
            </FlexElement>
          </Button>
        </Segment>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: selectors.isAuthenticated(state),
  isLogging: selectors.isAuthenticating(state),
  isRegistering: selectors.isRegistering(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
