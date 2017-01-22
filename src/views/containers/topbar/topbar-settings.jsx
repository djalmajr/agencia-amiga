import React from 'react';
import { isEmpty, values, merge } from 'lodash';
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.skills !== this.state.skills) {
  //     this.setState({ isCreatingSkill: false });
  //   }
  // }

  get initialState() {
    const { skills, user } = this.props;

    return {
      isCreatingSkill: false,
      skills: merge({}, skills),
      formData: {
        name: user.name || '',
        state: user.state || '',
        city: user.city || '',
        skills: user.skills || [],
      },
    };
  }

  handleAddItem = (e, { value }) => {
    const { skills } = this.state;

    if (!skills[value]) {
      const uid = genUID('skills');

      skills[uid] = { uid, name: value };

      console.log(skills[uid]);
      this.setState({ skills }, () => {
        this.props.actions.save('skills', skills[uid]);
      });
    }
  };

  handleChange = (e, { name, value }) => {
    const { formData } = this.state;

    formData[name] = value;

    console.log(formData, name, value);

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
    const { actions, user: { uid, email } } = this.props;

    evt.preventDefault();

    if (this.isValid(formData)) {
      actions.updateProfile({ ...formData, uid, email });
    }
  }

  isValid(data) {
    const isValid = !this.props.requiredFields
      .map(attr => data[attr])
      .some(val => isEmpty(val));

    if (!isValid) {
      this.props.actions.notifyError(data.uid ?
        'É completar os seus dados antes de continuar' :
        'É necessário preencher os campos obrigatórios',
      );
    }

    if (data.password && data.password !== data.password2) {
      this.props.actions.notifyError('As senhas não conferem.');
    }

    return isValid;
  }

  render() {
    const { isOpen, isUpdating } = this.props;
    const { formData, skills, isCreatingSkill } = this.state;

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
              value={formData.skills}
              options={values(skills).map(({ uid, name }) => ({ text: name, value: uid }))}
              onAddItem={this.handleAddItem}
              onChange={this.handleChange}
            />
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
        <Modal.Actions>
          <FlexElement justify="flex-end">
            <Button
              content="Fechar"
              style={{ marginRight: '0.8em' }}
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
          </FlexElement>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isUpdating: selectors.isUpdatingProfile(state),
  skills: selectors.read(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
