import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectors from '~/store/selectors';
import { Button, Divider, Icon, Loader, Table } from 'semantic-ui-react';
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
    isFetching: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  state = {
    selectedId: null,
    isModalOpen: false,
  };

  componentWillReceiveProps({ actions, user: { services } }) {
    const oldServices = this.props.user.services;

    if (services !== oldServices) {
      const newLen = _.keys(services).length;
      const oldLen = _.keys(oldServices).length;
      const operation = (
        (newLen > oldLen && 'criado') ||
        (newLen < oldLen && 'removido') ||
        'editado'
      );

      this.handleClose();

      actions.notify(`Serviço ${operation} com sucesso!`);
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

  handleRemove = (uid) => {
    this.props.actions.remove({ entity: 'services', uid });
  };

  render() {
    const { isOpen, selectedId } = this.state;
    const { isFetching, user } = this.props;

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
        {isFetching && !_.isEmpty(user.services) && (
          <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
            <Loader active>
              <span style={{ color: 'rgba(0,0,0, 0.45)' }}>
                Carregando serviços...
              </span>
            </Loader>
          </FlexElement>
        )}
        {!isFetching && _.isEmpty(user.services) && (
          <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
            <Icon name="wrench" style={styles.emptyIcon} />
            <span style={styles.emptyText}>
              Clique no botão acima para adicionar um serviço.
            </span>
          </FlexElement>
        )}
        {!isFetching && !_.isEmpty(user.services) && (
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
        )}
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
  isFetching: selectors.isFetching(state, 'services'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Services);
