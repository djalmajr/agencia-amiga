import React from 'react';
import latinize from 'latinize';
import moment from 'moment';
import { isEmpty, map, find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon, Image, Segment, Loader } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './results.scss';

let timeoutID = null;

class Results extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    filterOptions: React.PropTypes.array,
    isSearching: React.PropTypes.bool,
    location: React.PropTypes.object,
    records: React.PropTypes.array,
    searchFilter: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { actions } = this.props;
    const filter = this.getFilter();

    if (filter) {
      actions.changeSearchFilter({ filter });
    }
  }

  componentDidMount() {
    const { actions, searchFilter, records, isSearching } = this.props;
    const filter = this.getFilter() || searchFilter.filter;

    if (isEmpty(records) && !isSearching && !timeoutID) {
      if (filter === 'all') {
        actions.getAllEntities();
      } else {
        actions.getEntities({ entity: filter });
      }

      timeoutID = setTimeout(() => (timeoutID = null), 10000);
    }
  }

  getFilter() {
    const { filtro } = this.props.location.query || {};

    if (filtro) {
      const { value } = find(
        this.props.filterOptions,
        opt => filtro === latinize(opt.text).toLowerCase(),
      ) || {};

      return value;
    }

    return null;
  }

  navigateTo(entity, id) {
    const { filterOptions } = this.props;
    const { transitionTo } = this.context.router;
    const { text } = find(filterOptions, { value: entity });
    const slug = latinize(text).toLowerCase();

    transitionTo(`/${slug}/${id}`);
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

    if (!isSearching && isEmpty(records)) {
      return (
        <FlexElement column full align="center" justify="center" className={styles.wrapper}>
          <Icon name="cloud" size="massive" style={{ color: 'rgba(0,0,0, 0.1)' }} />
          <span style={{ color: 'rgba(0,0,0, 0.45)' }}>
            Nenhum resultado encontrado :(
          </span>
        </FlexElement>
      );
    }

    return (
      <FlexElement column full className={styles.wrapper}>
        {/*
        <FlexElement align="center" className={styles.sorting}>
          <strong>Ordenar por:</strong>
          <a href="#/" className={styles.selected}>Mais Recente</a><span>|</span>
          <a href="#/">Mais Antigo</a><span>|</span>
          <a href="#/">Popularidade</a>
        </FlexElement>
        */}
        <Card.Group itemsPerRow={4} className={styles.cards}>
          {map(records, (record, key) => {
            const date = moment(record.created_at);
            const { icon } = find(filterOptions, { value: record.entity });

            return (
              <Card
                key={key}
                className={styles.card}
                onClick={() => this.navigateTo(record.entity, record.id)}
              >
                <Card.Content>
                  {record.image ?
                    <Image floated="left" size="mini" src={record.image} /> :
                    <Icon className={styles.cardIcon} name={icon} color="black" />
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
                  <FlexElement column align="flex-end">
                    {/*
                    <Rating
                      disabled
                      icon="heart"
                      rating={3}
                      maxRating={5}
                      style={{ marginBottom: '0.5em' }}
                    />
                    */}
                    <span>
                      {date.isValid() && date.fromNow()}
                    </span>
                  </FlexElement>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </FlexElement>
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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
