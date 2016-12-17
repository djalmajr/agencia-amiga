import React from 'react';
import faker from 'faker';
import times from 'lodash/times';
import { Container, Header, Icon, Label, Segment } from 'semantic-ui-react';
import FlexColumn from '~/views/components/flex-column';
import styles from './servico.scss';

const Servico = () => (
  <Segment className={styles.servico}>
    <Container fluid>
      <FlexColumn style={{ marginBottom: 30 }}>
        <Header as="h5">
          <Icon name="clipboard" />
          <Header.Content>SERVIÇO</Header.Content>
        </Header>
        <p>{faker.lorem.sentence(20)}</p>
      </FlexColumn>
      <FlexColumn style={{ marginBottom: 30 }}>
        <Header as="h5">
          <Icon name="lightbulb" />
          <Header.Content>HABILIDADES REQUERIDAS</Header.Content>
        </Header>
        <Label.Group>
          <Label>Encanador</Label>
          <Label>Eletricista</Label>
        </Label.Group>
      </FlexColumn>
      <FlexColumn>
        <Header as="h5">
          <Icon name="clipboard" />
          <Header.Content>DESCRIÇÃO</Header.Content>
        </Header>
        {times(3).map(idx =>
          <p key={idx}>{faker.lorem.paragraph(6)}</p>,
        )}
      </FlexColumn>
    </Container>
  </Segment>
);

export default Servico;
