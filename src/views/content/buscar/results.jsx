import React from 'react';
import latinize from 'latinize';
import moment from 'moment';
import { withRouter } from 'react-router';
import { isEmpty, map, find } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, Icon, Image, Segment, Loader } from 'semantic-ui-react';
import { Filter } from '~/constants';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './results.scss';

let timeoutID = null;

class Results extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    entityFilter: React.PropTypes.string,
    isFiltering: React.PropTypes.bool,
    isLogged: React.PropTypes.bool,
    location: React.PropTypes.object,
    records: React.PropTypes.object,
    push: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { actions } = this.props;
    const entity = this.getFilter();

    if (entity) {
      actions.updateFilter({ name: 'entity', value: entity });
    }
  }

  componentDidMount() {
    const { actions, entityFilter, records, isFiltering, isLogged } = this.props;

    if (isEmpty(records) && !isFiltering && !timeoutID && isLogged) {
      actions.read({ entity: this.getFilter() || entityFilter });

      timeoutID = setTimeout(() => (timeoutID = null), 10000);
    }
  }

  getFilter() {
    const { tipo } = this.props.location.query || {};

    if (tipo) {
      const comparator = option => tipo === (latinize(option.text) || '').toLowerCase();
      const { value } = find(Filter.OPTIONS, comparator) || {};

      return value;
    }

    return null;
  }

  navigateTo(entity, id) {
    const { push } = this.props;
    const { text } = find(Filter.OPTIONS, { value: entity });
    const slug = latinize(text).toLowerCase();

    push(`/${slug}/${id}`);
  }

  render() {
    const { entityFilter, records, isFiltering } = this.props;

    if (isFiltering) {
      return (
        <Segment basic style={{ height: '100%', width: '100%' }}>
          <Loader active size="small" />
        </Segment>
      );
    }

    if (!isFiltering && isEmpty(records)) {
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
          {map(records, (record) => {
            const date = moment(record.created_at);
            const { icon } = find(Filter.OPTIONS, { value: entityFilter });

            return (
              <Card
                key={record.uid}
                className={styles.card}
                onClick={() => this.navigateTo(entityFilter, record.uid)}
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
  entityFilter: selectors.getEntityFilter(state),
  isLogged: selectors.isAuthenticated(state),
  isFiltering: selectors.isFiltering(state),
  records: selectors.getResults(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Results));
