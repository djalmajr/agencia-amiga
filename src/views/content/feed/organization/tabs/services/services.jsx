import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectors from '~/store/selectors';
import { Button, Divider, Icon, Table } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import FlexElement from '~/views/components/flex-element';
import Service from './service';
import Modal from './modal';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

class Services extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    user: React.PropTypes.object,
  };

  state = {
    selectedId: null,
    isModalOpen: false,
  };

  componentWillReceiveProps({ actions, user: { services } }) {
    const oldServices = this.props.user.services;

    if (services !== oldServices) {
      const message = _.keys(services).length !== _.keys(oldServices).length ?
        'Serviço criado com sucesso!' :
        'Serviço editado com sucesso!';

      this.handleClose();

      actions.notify(message);
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleCreate = () => {
    this.setState({ isOpen: true, selectedId: null });
  };

  handleEdit = (selectedId) => {
    this.setState({ isOpen: true, selectedId });
  };

  handleRemove = (selectedId) => {
    console.log('remove', selectedId); // eslint-disable-line
  };

  render() {
    const { isOpen, selectedId } = this.state;
    const { user } = this.props;

    return (
      <FlexElement column>
        <FlexElement justify="flex-end">
          <Button
            compact
            primary
            icon="plus"
            size="small"
            content="Serviço"
            onClick={this.handleCreate}
          />
        </FlexElement>
        <Modal isOpen={isOpen} uid={selectedId} onClose={this.handleClose} />
        <Divider style={{ marginBottom: 0 }} />
        {_.isEmpty(user.services) ?
          <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
            <Icon name="wrench" style={styles.emptyIcon} />
            <span style={styles.emptyText}>
              Clique no botão acima para adicionar um serviço.
            </span>
          </FlexElement> :
          <Table basic="very" style={{ margin: 0 }}>
            <Table.Body>
              {_.map(user.services, uid =>
                <Service
                  key={uid}
                  uid={uid}
                  onEdit={this.handleEdit}
                  onRemove={this.handleRemove}
                />,
              )}
            </Table.Body>
          </Table>
        }
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);
