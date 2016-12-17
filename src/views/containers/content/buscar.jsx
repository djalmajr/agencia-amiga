import React from 'react';
import moment from 'moment';
import { isEmpty, map, find, forEach } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Rating, Icon, Image, Segment, Loader } from 'semantic-ui-react';
import actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexColumn from '~/views/components/flex-column';
import FlexRow from '~/views/components/flex-row';
import styles from './buscar.scss';

let timeoutID = null;

class Buscar extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    filterOptions: React.PropTypes.array,
    isSearching: React.PropTypes.bool,
    searchFilter: React.PropTypes.string,
    records: React.PropTypes.array,
  };

  componentDidMount() {
    const { actions, filterOptions, searchFilter, records, isSearching } = this.props;

    if (isEmpty(records) && !isSearching && !timeoutID) {
      if (searchFilter === 'all') {
        forEach(filterOptions, ({ value }) => {
          if (value !== 'all') {
            actions.getEntities({ entity: value });
          }
        });
      } else {
        actions.getEntities({ entity: searchFilter });
      }

      timeoutID = setTimeout(() => (timeoutID = null), 10000);
    }
  }

  render() {
    const { records, isSearching, filterOptions } = this.props;

    if (isSearching) {
      return (
        <Segment basic style={{ height: '100%', width: '100%' }}>
          <Loader active size="small" />
        </Segment>
      );
    }

    return (
      <FlexColumn full className={styles.buscar}>
        <FlexRow align="center" className={styles.sorting}>
          <strong>Ordenar por:</strong>
          <a href="#/" className={styles.selected}>Mais Recente</a><span>|</span>
          <a href="#/">Mais Antigo</a><span>|</span>
          <a href="#/">Popularidade</a>
        </FlexRow>
        <Card.Group itemsPerRow={4} className={styles.cards}>
          {map(records, (record, key) => {
            const date = moment(record.created_at);
            const { icon } = find(filterOptions, { value: record.entity });

            return (
              <Card key={key}>
                <Card.Content>
                  {record.image ?
                    <Image floated="left" size="mini" src={record.image} /> :
                    <Icon className={styles.cardIcon} name={icon} />
                  }
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
                      {date.isValid() && date.fromNow()}
                    </span>
                  </FlexColumn>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </FlexColumn>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: selectors.getSearchStatus(state),
  filterOptions: selectors.getFilterOptions(state),
  searchFilter: selectors.getSearchFilter(state),
  records: selectors.getSearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buscar);
