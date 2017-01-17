import React from 'react';
import faker from 'faker';
import times from 'lodash/times';
import { Container, Header, Icon, Label, Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import styles from './organizacao.scss';

const Organizacao = () => (
  <Segment className={styles.organizacao}>
    <Container fluid>
      <FlexElement column style={{ marginBottom: 30 }}>
        <Header as="h5">
          <Icon name="clipboard" />
          <Header.Content>SERVIÇO</Header.Content>
        </Header>
        <p>{faker.lorem.sentence(20)}</p>
      </FlexElement>
      <FlexElement column style={{ marginBottom: 30 }}>
        <Header as="h5">
          <Icon name="lightbulb" />
          <Header.Content>HABILIDADES REQUERIDAS</Header.Content>
        </Header>
        <Label.Group>
          <Label>Encanador</Label>
          <Label>Eletricista</Label>
        </Label.Group>
      </FlexElement>
      <FlexElement column>
        <Header as="h5">
          <Icon name="clipboard" />
          <Header.Content>DESCRIÇÃO</Header.Content>
        </Header>
        {times(3).map(idx =>
          <p key={idx}>{faker.lorem.paragraph(6)}</p>,
        )}
      </FlexElement>
    </Container>
  </Segment>
);

export default Organizacao;
