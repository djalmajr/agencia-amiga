import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import genUID from '~/helpers/gen-uid';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
// import styles from './services-modal.scss';

class ServicesModal extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isSaving: React.PropTypes.bool,
    skills: React.PropTypes.object,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = this.initialState;
  }

  componentWillReceiveProps({ skills, user: { services } }) {
    const oldSkills = this.state.skills;
    const oldServices = this.props.user.services;

    if (_.values(skills).length !== _.values(oldSkills).length) {
      this.setState({
        isCreatingSkill: false,
        skills: _.merge({}, skills),
      });
    }

    if (_.values(services).length !== _.values(oldServices).length) {
      this.setState({ isOpen: false });
    }
  }

  get initialState() {
    const { skills } = this.props;

    return {
      date: moment(),
      isOpen: false,
      isCreatingSkill: false,
      skills: _.merge({}, skills),
      formData: {
        name: '',
        details: '',
        qtyAvailable: '',
        skills: [],
      },
    };
  }

  handleClose = () => {
    this.setState(this.initialState);
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleChange = (e, data = {}) => {
    const { skills } = this.state;
    const formData = _.merge({}, this.state.formData);
    const name = data.name || e.currentTarget.name;
    const value = data.value || e.currentTarget.value;

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

      formData[name] = newValue;
    } else {
      formData[name] = value;
    }

    this.setState({ formData });
  };

  handleSubmit = (evt) => {
    const { formData } = this.state;
    const { actions } = this.props;

    evt.preventDefault();

    if (this.isValid(formData)) {
      actions.addToOrg({ data: formData, entity: 'services' });
    }
  }

  isValid(data) {
    const isValid = !['name', 'qtyAvailable', 'details', 'skills']
      .map(attr => data[attr])
      .some(val => _.isEmpty(val));

    if (!isValid) {
      this.props.actions.notifyError('É necessário preencher os campos obrigatórios');
    }

    return isValid;
  }

  render() {
    const { skills, isSaving } = this.props;
    const { isOpen, formData, isCreatingSkill } = this.state;
    const options = _.values(skills).map(({ uid, name }) => ({ text: name, value: uid }));
    const button = (
      <FlexElement justify="flex-end">
        <Button
          compact
          primary
          icon="plus"
          size="small"
          content="Serviço"
          onClick={this.handleOpen}
        />
      </FlexElement>
    );

    return (
      <Modal
        open={isOpen}
        trigger={button}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onClose={this.handleClose}
      >
        <Modal.Header>
          Novo Serviço
        </Modal.Header>
        <Modal.Content as={Form}>
          <Form.Group widths="equal">
            <Form.Input
              required
              name="name"
              label="Nome"
              placeholder="Nome que será exibido nos resultados da pesquisa"
              disabled={isSaving}
              value={formData.name}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              name="qtyAvailable"
              label="Vagas disponíveis"
              placeholder="Número de vagas disponíveis"
              disabled={isSaving}
              value={formData.qtyAvailable}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Select
            fluid
            search
            required
            multiple
            selection
            allowAdditions
            name="skills"
            label="Habilidades"
            additionLabel="Adicionar: "
            placeholder="Digite as habilidades necessárias para este serviço"
            noResultsMessage="Nenhum resultado encontrado"
            options={options}
            disabled={isSaving}
            loading={isCreatingSkill}
            value={_.keys(formData.skills)}
            onChange={this.handleChange}
          />
          <Form.TextArea
            required
            rows="6"
            name="details"
            label="Detalhes"
            placeholder="Do que se trata este serviço?"
            disabled={isSaving}
            value={formData.details}
            onChange={this.handleChange}
          />
        </Modal.Content>
        <Modal.Actions as={FlexElement} justify="flex-end">
          <Button
            content="Fechar"
            disabled={isSaving}
            onClick={this.handleClose}
          />
          <Button
            primary
            icon="save"
            content="Salvar"
            loading={isSaving}
            disabled={isSaving}
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
  skills: selectors.getEntities(state, 'skills'),
  isSaving: (
    selectors.isFetching(state, 'services') ||
    selectors.isFetching(state, 'users')
  ),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesModal);
