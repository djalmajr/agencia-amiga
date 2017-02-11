import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import genUID from '~/helpers/gen-uid';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';

const initialState = {
  isCreatingSkill: false,
  skills: {},
  options: [],
  formData: {
    name: '',
    details: '',
    qtyAvailable: '',
    skills: [],
  },
};

class ModalService extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    service: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
    isSaving: React.PropTypes.bool,
    skills: React.PropTypes.object,
    onClose: React.PropTypes.func,
  };

  static defaultProps = {
    service: {},
  };

  state = initialState;

  componentWillReceiveProps({ skills }) {
    if (skills !== this.props.skills) {
      this.setState({ isCreatingSkill: false });
    }
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleOpen = () => {
    const { skills, service } = this.props;

    this.setState({
      isCreatingSkill: false,
      skills: _.merge({}, skills),
      options: _.values(skills).map(({ uid, name }) => ({
        text: name,
        value: uid,
      })),
      formData: {
        name: service.name || '',
        details: service.details || '',
        qtyAvailable: service.qtyAvailable || '',
        skills: service.skills || [],
      },
    });
  }

  handleChange = (e, data = {}) => {
    const { skills, options } = this.state;
    const formData = _.merge({}, this.state.formData);
    const name = data.name || e.currentTarget.name;
    const value = data.value || e.currentTarget.value;

    if (name === 'skills') {
      const newValue = {};
      const newSkill = _.remove(value, attr => !skills[attr])[0];

      if (newSkill) {
        const uid = genUID('skills');

        skills[uid] = { uid, name: newSkill };

        options.push({ text: newSkill, value: uid });

        this.setState({ options, skills }, () => {
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
    const { actions, service } = this.props;

    evt.preventDefault();

    if (this.isValid(formData)) {
      actions.addToOrg({
        entity: 'services',
        data: _.assign({}, service, formData),
      });
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
    const { isOpen, isSaving, service } = this.props;
    const { formData, options, isCreatingSkill } = this.state;

    return (
      <Modal
        open={isOpen}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onMount={this.handleOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          {service.uid ? 'Editar Serviço' : 'Novo Serviço'}
        </Modal.Header>
        <Modal.Content as={Form} onSubmit={this.handleSubmit}>
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

const mapStateToProps = (state, { uid }) => ({
  user: selectors.getUser(state),
  skills: selectors.getEntities('skills')(state),
  service: selectors.getEntity('services', uid)(state),
  isSaving: (
    selectors.isFetching('services')(state) ||
    selectors.isFetching('users')(state)
  ),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalService);
