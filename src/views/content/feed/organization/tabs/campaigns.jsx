import React from 'react';
import { Button, Divider, Icon, Header, Image, Table } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

const Campaigns = ({ isEmpty }) => (
  <FlexElement column>
    <FlexElement justify="flex-end">
      <Button compact primary icon="plus" size="small" content="Campanha" />
    </FlexElement>
    <Divider style={{ marginBottom: 0 }} />
    {isEmpty ?
      <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
        <Icon name="bullhorn" style={styles.emptyIcon} />
        <span style={styles.emptyText}>
          Clique no botão acima para adicionar uma campanha.
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

Campaigns.propTypes = {
  isEmpty: React.PropTypes.bool,
};

Campaigns.defaultProps = {
  isEmpty: true,
};

export default Campaigns;
