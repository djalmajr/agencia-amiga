import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectors from '~/store/selectors';
import { Button, Divider, Icon, Loader, Table } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import FlexElement from '~/views/components/flex-element';
import Campaign from './campaign';
import Modal from './modal';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

class Campaigns extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    isLogged: React.PropTypes.bool,
    hasCampaigns: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  state = {
    selectedId: null,
    isModalOpen: false,
  };

  componentDidMount() {
    const { actions, hasCampaigns, isLogged, isFetching } = this.props;

    if (!hasCampaigns && isLogged && !isFetching) {
      actions.read({ entity: 'campaigns' });
    }
  }

  componentWillReceiveProps({ actions, user: { campaigns } }) {
    const oldCampaigns = this.props.user.campaigns;

    if (campaigns !== oldCampaigns) {
      const newLen = _.keys(campaigns).length;
      const oldLen = _.keys(oldCampaigns).length;
      const operation = (
        (newLen > oldLen && 'criada') ||
        (newLen < oldLen && 'removida') ||
        'editada'
      );

      this.handleClose();

      actions.notify(`Campanha ${operation} com sucesso!`);
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
    this.props.actions.remove({ entity: 'campaigns', uid });
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
            content="Campanha"
            onClick={this.handleCreate}
          />
        </FlexElement>
        <Modal isOpen={isOpen} uid={selectedId} onClose={this.handleClose} />
        <Divider style={{ marginBottom: 0 }} />
        {isFetching && !_.isEmpty(user.campaigns) && (
          <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
            <Loader active>
              <span style={{ color: 'rgba(0,0,0, 0.45)' }}>
                Carregando campanhas...
              </span>
            </Loader>
          </FlexElement>
        )}
        {!isFetching && _.isEmpty(user.campaigns) && (
          <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
            <Icon name="bullhorn" style={styles.emptyIcon} />
            <span style={styles.emptyText}>
              Clique no botão acima para adicionar um campanha.
            </span>
          </FlexElement>
        )}
        {!isFetching && !_.isEmpty(user.campaigns) && (
          <Table basic="very" style={{ margin: 0 }}>
            <Table.Body>
              {_.map(user.campaigns, uid =>
                <Campaign
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
  user: selectors.getUser(state),
  isLogged: selectors.isAuthenticated(state),
  isFetching: selectors.isFetching(state, 'campaigns'),
  hasCampaigns: !_.isEmpty(selectors.getEntities(state, 'campaigns')),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);
