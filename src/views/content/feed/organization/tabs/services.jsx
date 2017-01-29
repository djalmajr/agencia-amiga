import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as selectors from '~/store/selectors';
import { Divider, Icon, Header, Table } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import Modal from './services-modal';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

const Services = ({ user }) => (
  <FlexElement column>
    <Modal />
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
          {_.map(user.services, key =>
            <Table.Row key={key}>
              <Table.Cell>
                <Header as="h4" image>
                  <Icon name="wrench" />
                  <Header.Content>
                    {key}
                    <Header.Subheader>Human Resources</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell collapsing>
                <Icon link name="edit" style={{ marginRight: 10 }} />
                <Icon link name="trash outline" style={{ marginTop: -1 }} />
              </Table.Cell>
            </Table.Row>,
          )}
        </Table.Body>
      </Table>
    }
  </FlexElement>
);

Services.propTypes = {
  user: React.PropTypes.object,
};

const mapStateToProps = state => ({
  user: selectors.getUserData(state),
  // services: selectors.getUserData(state),
});

export default connect(mapStateToProps)(Services);
