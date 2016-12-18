import React from 'react';
import latinize from 'latinize';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Icon, Input, Dropdown } from 'semantic-ui-react';
import actionCreatos from '~/store/actions';
import selectors from '~/store/selectors';
import styles from './topbar-search.scss';

class TopBarSearch extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    filterOptions: React.PropTypes.array,
    isSearching: React.PropTypes.bool,
    searchFilter: React.PropTypes.object,
    searchQuery: React.PropTypes.string,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleFilterClick = (evt, { value }) => {
    evt.preventDefault();

    this.props.actions.changeSearchFilter({ filter: value });
  };

  handleSearch = (evt, { query }) => {
    const { actions, searchFilter, filterOptions } = this.props;
    const { text } = find(filterOptions, { value: searchFilter.filter });
    const slug = latinize(text).toLowerCase();

    evt.preventDefault();

    actions.search(query);

    if (searchFilter.filter === 'all') {
      actions.getAllEntities();
    } else {
      actions.getEntities({ entity: searchFilter.filter });
    }

    this.context.router.transitionTo({
      pathname: '/buscar',
      query: searchFilter.filter === 'all' ? null : { filtro: slug },
    });
  };

  render() {
    const { isSearching, searchQuery, searchFilter, filterOptions } = this.props;
    const selected = find(filterOptions, { value: searchFilter.filter });

    return (
      <Form className={styles.searchForm} onSubmit={this.handleSearch}>
        <Input action focus={false} className={styles.searchInput}>
          <Icon name={selected.icon} />
          <input name="query" defaultValue={searchQuery} placeholder={`Buscar ${selected.text}`} />
          <Dropdown pointing="top left" icon="sliders" className={styles.filters}>
            <Dropdown.Menu>
              {filterOptions.map(option =>
                <Dropdown.Item
                  key={option.value}
                  selected={searchFilter.filter === option.value}
                  icon={option.icon}
                  value={option.value}
                  text={option.text}
                  onClick={this.handleFilterClick}
                />,
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Button type="submit" className={styles.filterButton} disabled={isSearching}>
            Buscar
          </Button>
        </Input>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: selectors.getSearchStatus(state),
  filterOptions: selectors.getFilterOptions(state),
  searchFilter: selectors.getSearchFilter(state),
  searchQuery: selectors.getSearchQuery(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreatos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBarSearch);
