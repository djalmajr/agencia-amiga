import React from 'react';
import { connect } from 'react-redux';
import { Icon, Header, Table } from 'semantic-ui-react';
import selectors from '~/store/selectors';

const styles = {
  edit: { marginRight: 10 },
  remove: { marginTop: -1 },
};

const Service = ({ service, onEdit, onRemove }) => (
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
      <Icon link name="edit" style={styles.edit} onClick={() => onEdit(service.uid)} />
      <Icon link name="trash outline" style={styles.remove} onClick={() => onRemove(service.uid)} />
    </Table.Cell>
  </Table.Row>
);

Service.propTypes = {
  service: React.PropTypes.object,
  onEdit: React.PropTypes.func,
  onRemove: React.PropTypes.func,
};

const mapStateToProps = (state, { uid }) => ({
  service: selectors.getEntities(state, 'services', uid),
});

export default connect(mapStateToProps)(Service);
