import React from 'react';
import { Divider, Icon, Header, Image, Table } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import Modal from './services-modal';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

const Services = ({ isEmpty }) => (
  <FlexElement column>
    <Modal />
    <Divider style={{ marginBottom: 0 }} />
    {isEmpty ?
      <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
        <Icon name="wrench" style={styles.emptyIcon} />
        <span style={styles.emptyText}>
          Clique no botão acima para adicionar um serviço.
        </span>
      </FlexElement> :
      <Table basic="very" style={{ margin: 0 }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image src="http://semantic-ui.com/images/avatar2/small/lena.png" shape="rounded" size="mini" />
                <Header.Content>
                  Lena
                  <Header.Subheader>Human Resources</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell collapsing>
              <Icon link name="edit" style={{ marginRight: 10 }} />
              <Icon link name="trash outline" style={{ marginTop: -1 }} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image src="http://semantic-ui.com/images/avatar2/small/matthew.png" shape="rounded" size="mini" />
                <Header.Content>
                  Matthew
                  <Header.Subheader>Fabric Design</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              15
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image src="http://semantic-ui.com/images/avatar2/small/lindsay.png" shape="rounded" size="mini" />
                <Header.Content>
                  Lindsay
                  <Header.Subheader>Entertainment</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              12
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image src="http://semantic-ui.com/images/avatar2/small/mark.png" shape="rounded" size="mini" />
                <Header.Content>
                  Mark
                  <Header.Subheader>Executive</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              11
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    }
  </FlexElement>
);

Services.propTypes = {
  isEmpty: React.PropTypes.bool,
};

Services.defaultProps = {
  isEmpty: true,
};

export default Services;
