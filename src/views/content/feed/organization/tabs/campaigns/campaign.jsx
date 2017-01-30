import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Header, Loader, Modal, Table } from 'semantic-ui-react';
import selectors from '~/store/selectors';

const styles = {
  edit: { marginRight: 10 },
  remove: { marginTop: -1 },
  loader: { marginLeft: 8, marginRight: 5, position: 'relative' },
};

class Campaign extends React.Component {
  static propTypes = {
    isRemoving: React.PropTypes.bool,
    campaign: React.PropTypes.object,
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
    const { isRemoving, campaign, onEdit } = this.props;
    const trigger = isRemoving ?
      <span style={styles.loader}><Loader active size="mini" /></span> :
      <Icon link name="trash outline" style={styles.remove} onClick={this.handleOpen} />;

    return (
      <Table.Row>
        <Table.Cell>
          <Header as="h4" image>
            <Icon name="bullhorn" />
            <Header.Content>
              {campaign.name}
              <Header.Subheader>
                {(campaign.details || '').length > 200 ?
                  `${campaign.details.substr(0, 200)}...` :
                  campaign.details
                }
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell collapsing>
          <Icon
            link
            name="edit"
            style={styles.edit}
            onClick={() => onEdit(campaign.uid)}
          />
          <Modal
            size="small"
            open={isOpen}
            trigger={trigger}
            closeOnEscape={false}
            closeOnRootNodeClick={false}
          >
            <Header size="mini" content="Remover Campanha" />
            <Modal.Content>
              Confirmar a remoção de <strong>{campaign.name}</strong>?
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
  campaign: selectors.getEntities(state, 'campaigns', uid),
  isRemoving: selectors.isRemoving(state, 'campaigns', uid),
});

export default connect(mapStateToProps)(Campaign);
