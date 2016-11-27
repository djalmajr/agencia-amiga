import React from 'react';
import moment from 'moment';
import faker from 'faker';
import times from 'lodash/times';
import { Card, Rating, Image } from 'semantic-ui-react';
import FlexColumn from '~/views/components/flex-column';
import FlexRow from '~/views/components/flex-row';
import styles from './servicos.scss';

moment.locale('pt-br');

const records = times(19).map(() => ({
  title: faker.name.findName(),
  meta: '350 visualizações',
  description: faker.lorem.sentences(3, 3),
  image: faker.internet.avatar(),
  created_at: new Date().toJSON(),
}));

const Servicos = () => (
  <FlexColumn full className={styles.servicos}>
    <FlexRow align="center" className={styles.sorting}>
      <strong>Ordenar por:</strong>
      <a href="#/" className={styles.selected}>Mais Recente</a><span>|</span>
      <a href="#/">Mais Antigo</a><span>|</span>
      <a href="#/">Popularidade</a>
    </FlexRow>
    <Card.Group itemsPerRow={4} className={styles.cards}>
      {records.map((record, idx) =>
        <Card key={idx}>
          <Card.Content>
            <Image floated="left" size="mini" src={record.image} />
            <Card.Header>{record.title}</Card.Header>
            <Card.Meta>{record.meta}</Card.Meta>
            <Card.Description>
              {record.description.length - 3 > 100 ?
                `${record.description.slice(0, 100)}...` :
                record.description
              }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <FlexColumn align="flex-end">
              <Rating icon="heart" rating={3} maxRating={5} disabled />
              <span style={{ marginTop: '0.5em' }}>
                {moment(record.created_at).fromNow()}
              </span>
            </FlexColumn>
          </Card.Content>
        </Card>,
      )}
    </Card.Group>
  </FlexColumn>
);

export default Servicos;
