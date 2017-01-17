import React from 'react';
import { values } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Input, Modal } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import SelectHabilidades from './topbar-settings-habilidades';
import styles from './topbar-settings.scss';


class Settings extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isOpen: React.PropTypes.bool,
    skills: React.PropTypes.object,
    onClose: React.PropTypes.func,
  };

  state = {
    selectedSkills: [],
  };

  handleChange = (e, { value }) => {
    this.setState({ selectedSkills: value });
  };

  handleAddItem = (e, { value }) => {
    const { actions } = this.props;

    actions.addSkill(value);
  };

  render() {
    const { isOpen, skills, onClose } = this.props;
    const { selectedSkills } = this.state;

    return (
      <Modal
        open={isOpen}
        closeOnRootNodeClick={false}
        className={styles.settings}
        onClose={onClose}
      >
        <Modal.Header>
          Configurações
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input required label="Nome Completo" name="nome" placeholder="Ex.: José Cícero" />
            <Form.Field
              required
              label="Habilidades"
              value={selectedSkills}
              options={values(skills).map(skill => ({ text: skill, value: skill }))}
              onAddItem={this.handleAddItem}
              onChange={this.handleChange}
              control={SelectHabilidades}
            />
            <Form.Group widths="equal">
              <Form.Input required label="Estado" name="estado" placeholder="Ex.: Alagoas" />
              <Form.Input required label="Cidade" name="cidade" placeholder="Ex.: Maceió" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="js-senha-atual">Senha Atual</label>
                <Input type="senha" placeholder="******" />
                <small>Obs.: Deixe em branco para não alterar</small>
              </Form.Field>
              <Form.Input label="Nova Senha" name="senha2" placeholder="******" />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <FlexElement justify="flex-end">
            <Button content="Fechar" style={{ marginRight: '0.8em' }} onClick={onClose} />
            <Button primary content="Salvar" icon="save" type="submit" />
          </FlexElement>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
