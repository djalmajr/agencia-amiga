import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Header, Loader, Modal, Table } from 'semantic-ui-react';
import selectors from '~/store/selectors';

const styles = {
  edit: { marginRight: 10 },
  remove: { marginTop: -1 },
  loader: { marginLeft: 8, marginRight: 5, position: 'relative' },
};

class Service extends React.Component {
  static propTypes = {
    isRemoving: React.PropTypes.bool,
    service: React.PropTypes.object,
    uid: React.PropTypes.string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleRemove = () => {
    this.setState({ isOpen: false }, () => {
      this.props.onRemove(this.props.uid);
    });
  };

  render() {
    const { isOpen } = this.state;
    const { isRemoving, service, onEdit } = this.props;
    const trigger = isRemoving ?
      <span style={styles.loader}><Loader active size="mini" /></span> :
      <Icon link name="trash outline" style={styles.remove} onClick={this.handleOpen} />;

    return (
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Icon name="wrench" />
            <Header.Content>
              {service.name}
              <Header.Subheader>{service.details}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell collapsing>
          <Icon
            link
            name="edit"
            style={styles.edit}
            onClick={() => onEdit(service.uid)}
          />
          <Modal
            size="small"
            open={isOpen}
            trigger={trigger}
            closeOnEscape={false}
            closeOnRootNodeClick={false}
          >
            <Header size="mini" icon="trash outline" content="Remover Serviço" />
            <Modal.Content>
              Confirmar a remoção do serviço <strong>{service.name}</strong>?
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose}>
                <Icon name="remove" /> Não
              </Button>
              <Button color="red" onClick={this.handleRemove}>
                <Icon name="trash outline" /> Sim
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = (state, { uid }) => ({
  service: selectors.getEntities(state, 'services', uid),
  isRemoving: selectors.isRemoving(state, 'services', uid),
});

export default connect(mapStateToProps)(Service);
