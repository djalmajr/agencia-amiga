import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import genUID from '~/helpers/gen-uid';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './topbar-settings.scss';

class Settings extends React.PureComponent {
  static propTypes = {
    actions: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
    isUpdating: React.PropTypes.bool,
    requiredFields: React.PropTypes.array,
    skills: React.PropTypes.object,
    user: React.PropTypes.object,
    onClose: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.skills !== this.state.skills) {
      this.setState({
        isCreatingSkill: false,
        skills: _.merge({}, nextProps.skills),
      });
    }
  }

  get initialState() {
    const { skills, user } = this.props;

    return {
      isCreatingSkill: false,
      skills: _.merge({}, skills),
      formData: {
        name: user.name || '',
        state: user.state || '',
        city: user.city || '',
        skills: user.skills || [],
      },
    };
  }

  handleChange = (e, { name, value }) => {
    const { skills } = this.state;
    const formData = _.merge({}, this.state.formData);

    if (name === 'skills') {
      const newValue = {};
      const newSkill = _.remove(value, attr => !skills[attr])[0];

      if (newSkill) {
        const uid = genUID('skills');

        skills[uid] = { uid, name: newSkill };

        this.setState({ skills }, () => {
          this.props.actions.save('skills', skills[uid]);
        });

        newValue[uid] = uid;
      }

      value.forEach(uid => (newValue[uid] = uid));
      value = newValue;
    }

    formData[name] = value;

    this.setState({ formData });
  };

  handleClose = () => {
    const { user, onClose } = this.props;

    if (this.isValid(user)) {
      this.setState(this.initialState, onClose);
    }
  };

  handleSubmit = (evt) => {
    const { formData } = this.state;
    const { actions, user } = this.props;

    evt.preventDefault();

    if (this.isValid(formData)) {
      actions.updateProfile(_.merge({}, user, formData));
    }
  }

  isValid(data) {
    const isValid = !this.props.requiredFields
      .map(attr => data[attr])
      .some(val => _.isEmpty(val));

    if (!isValid) {
      this.props.actions.notifyError(data.uid ?
        'É necessário completar os seus dados antes de continuar' :
        'É necessário preencher os campos obrigatórios',
      );
    }

    if (data.password && data.password !== data.password2) {
      this.props.actions.notifyError('As senhas não conferem.');
    }

    return isValid;
  }

  render() {
    const { isOpen, isUpdating, user } = this.props;
    const { formData, skills, isCreatingSkill } = this.state;
    const options = _.values(skills).map(({ uid, name }) => ({ text: name, value: uid }));

    return (
      <Modal
        open={isOpen}
        closeOnRootNodeClick={false}
        className={styles.settings}
        onClose={this.handleClose}
      >
        <Modal.Header>
          Configurações
        </Modal.Header>
        <Modal.Content>
          <Form ref={el => (this.form = el)}>
            <Form.Input
              required
              name="name"
              label="Nome Completo"
              placeholder="Ex.: José Cícero"
              disabled={isUpdating}
              value={formData.name}
              onChange={this.handleChange}
            />
            {user.type === 'volunteer' && (
              <Form.Select
                fluid
                search
                required
                multiple
                selection
                allowAdditions
                name="skills"
                label="Habilidades"
                placeholder="Digite suas habilidades"
                noResultsMessage="Nenhum resultado encontrado"
                disabled={isUpdating}
                loading={isCreatingSkill}
                value={_.keys(formData.skills)}
                options={options}
                onChange={this.handleChange}
              />
            )}
            <Form.Group widths="equal">
              <Form.Input
                required
                name="state"
                label="Estado"
                placeholder="Ex.: Alagoas"
                disabled={isUpdating}
                value={formData.state}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                name="city"
                label="Cidade"
                placeholder="Ex.: Maceió"
                disabled={isUpdating}
                value={formData.city}
                onChange={this.handleChange}
              />
            </Form.Group>
            {/*
              <Form.Group widths="equal">
                <Form.Field disabled={isUpdating}>
                  <label htmlFor>Senha Atual</label>
                  <Form.Input name="password" type="password" placeholder="******" />
                  <small>Obs.: Deixe em branco para não alterar</small>
                </Form.Field>
                <Form.Input
                  name="password2"
                  type="password"
                  label="Nova Senha"
                  placeholder="******"
                  disabled={isUpdating}
                />
              </Form.Group>
            */}
          </Form>
        </Modal.Content>
        <Modal.Actions as={FlexElement} justify="flex-end">
          <Button
            content="Fechar"
            disabled={isUpdating}
            onClick={this.handleClose}
          />
          <Button
            primary
            content="Salvar"
            icon="save"
            loading={isUpdating}
            disabled={isUpdating}
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isUpdating: selectors.isUpdatingProfile(state),
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
