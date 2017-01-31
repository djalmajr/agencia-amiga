import React from 'react';
import latinize from 'latinize';
import moment from 'moment';
import { isEmpty, map, find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon, Image, Segment, Loader } from 'semantic-ui-react';
import { Filter } from '~/constants';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './results.scss';

// const timeoutID = null;

class Results extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isSearching: React.PropTypes.bool,
    // isLogged: React.PropTypes.bool,
    location: React.PropTypes.object,
    records: React.PropTypes.array,
    // appliedFilter: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { actions } = this.props;
    const filter = this.getFilter();

    if (filter) {
      actions.updateFilter({ filter });
    }
  }

  componentDidMount() {
    // const { actions, appliedFilter, records, isSearching, isLogged } = this.props;
    // const filter = this.getFilter() || appliedFilter.filter;

    // if (isEmpty(records) && !isSearching && !timeoutID && isLogged) {
    //   if (filter === 'all') {
    //     actions.readAll();
    //   } else {
    //     actions.read({ entity: filter });
    //   }

    //   timeoutID = setTimeout(() => (timeoutID = null), 10000);
    // }
  }

  getFilter() {
    const { filtro } = this.props.location.query || {};

    if (filtro) {
      const comparator = option => filtro === latinize(option.text).toLowerCase();
      const { value } = find(Filter.OPTIONS, comparator) || {};

      return value;
    }

    return null;
  }

  navigateTo(entity, id) {
    const { transitionTo } = this.context.router;
    const { text } = find(Filter.OPTIONS, { value: entity });
    const slug = latinize(text).toLowerCase();

    transitionTo(`/${slug}/${id}`);
  }

  render() {
    const { records, isSearching } = this.props;

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
            const { icon } = find(Filter.OPTIONS, { value: record.entity });

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
  isLogged: selectors.isAuthenticated(state),
  isSearching: selectors.isSearching(state),
  appliedFilter: selectors.getAppliedFilter(state),
  records: selectors.getSearchResults(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
