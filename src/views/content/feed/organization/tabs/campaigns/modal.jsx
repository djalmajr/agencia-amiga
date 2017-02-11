import _ from 'lodash';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';

const initialState = {
  formData: {
    name: '',
    details: '',
  },
};

class ModalCampaign extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    campaign: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
    isSaving: React.PropTypes.bool,
    onClose: React.PropTypes.func,
  };

  static defaultProps = {
    campaign: {},
  };

  state = initialState;

  handleClose = () => {
    this.props.onClose();
  };

  handleOpen = () => {
    const { campaign } = this.props;

    this.setState({
      formData: {
        name: campaign.name || '',
        details: campaign.details || '',
      },
    });
  }

  handleChange = (e, data = {}) => {
    const formData = _.merge({}, this.state.formData);
    const name = data.name || e.currentTarget.name;
    const value = data.value || e.currentTarget.value;

    formData[name] = value;

    this.setState({ formData });
  };

  handleSubmit = (evt) => {
    const { formData } = this.state;
    const { actions, campaign } = this.props;

    evt.preventDefault();

    if (this.isValid(formData)) {
      actions.addToOrg({
        entity: 'campaigns',
        data: _.assign({}, campaign, formData),
      });
    }
  }

  isValid(data) {
    const isValid = !['name', 'details']
      .map(attr => data[attr])
      .some(val => _.isEmpty(val));

    if (!isValid) {
      this.props.actions.notifyError('É necessário preencher os campos obrigatórios');
    }

    return isValid;
  }

  render() {
    const { isOpen, isSaving, campaign } = this.props;
    const { formData } = this.state;

    return (
      <Modal
        open={isOpen}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        onMount={this.handleOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>
          {campaign.uid ? 'Editar Campanha' : 'Nova Campanha'}
        </Modal.Header>
        <Modal.Content as={Form} onSubmit={this.handleSubmit}>
          <Form.Input
            required
            name="name"
            label="Nome"
            placeholder="Nome que será exibido nos resultados da pesquisa"
            disabled={isSaving}
            value={formData.name}
            onChange={this.handleChange}
          />
          <Form.TextArea
            required
            rows="6"
            name="details"
            label="Detalhes"
            placeholder="Do que se trata esta campanha?"
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
  campaign: selectors.getEntity('campaigns', uid)(state),
  isSaving: (
    selectors.isFetching('campaigns')(state) ||
    selectors.isFetching('users')(state)
  ),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCampaign);
