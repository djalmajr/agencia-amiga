import React from 'react';
import latinize from 'latinize';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Form, Icon, Input, Dropdown } from 'semantic-ui-react';
import { Filter } from '~/constants';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import styles from './search.scss';

class TopBarSearch extends React.Component {
  static propTypes = {
    entity: React.PropTypes.string,
    isFiltering: React.PropTypes.bool,
    query: React.PropTypes.string,
    push: React.PropTypes.func,
    onFilter: React.PropTypes.func,
    onUpdateFilter: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleFilterClick = (evt, { value }) => {
    evt.preventDefault();

    this.props.onUpdateFilter({ name: 'entity', value });
  };

  handleSearch = (evt, { query }) => {
    const { entity, push, onFilter } = this.props;
    const { text } = find(Filter.OPTIONS, { value: entity });
    const tipo = latinize(text).toLowerCase();

    evt.preventDefault();

    onFilter({ query });
    push({ pathname: '/buscar', query: { tipo } });
  };

  render() {
    const { entity, query, isFiltering } = this.props;
    const selected = find(Filter.OPTIONS, { value: entity });

    return (
      <Form className={styles.searchForm} onSubmit={this.handleSearch}>
        <Input action focus={false} className={styles.searchInput}>
          <Icon name={selected.icon} />
          <input name="query" defaultValue={query} placeholder={`Buscar ${selected.text}`} />
          <Dropdown pointing="top left" icon="sliders" className={styles.filters}>
            <Dropdown.Menu>
              {Filter.OPTIONS.map(option =>
                <Dropdown.Item
                  key={option.value}
                  selected={entity === option.value}
                  icon={option.icon}
                  value={option.value}
                  text={option.text}
                  onClick={this.handleFilterClick}
                />,
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Button type="submit" className={styles.filterButton} disabled={isFiltering}>
            Buscar
          </Button>
        </Input>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isFiltering: selectors.isFiltering(state),
  entity: selectors.getEntityFilter(state),
  query: selectors.getQueryFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onFilter: () => dispatch(actionCreators.filter()),
  onUpdateFilter: updates => dispatch(actionCreators.updateFilter(updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopBarSearch));
