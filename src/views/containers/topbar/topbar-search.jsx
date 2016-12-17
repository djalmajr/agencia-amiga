import React from 'react';
import { find, forEach } from 'lodash';
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
    searchFilter: React.PropTypes.string,
    searchQuery: React.PropTypes.string,
  };

  handleFilterClick = (evt, { value }) => {
    evt.preventDefault();

    this.props.actions.changeSearchFilter(value);
  };

  handleSearch = (evt, { query }) => {
    const { actions, searchFilter, filterOptions } = this.props;

    evt.preventDefault();

    actions.search(query);

    if (searchFilter === 'all') {
      forEach(filterOptions, ({ value }) => {
        if (value !== 'all') {
          actions.getEntities({ entity: value });
        }
      });
    } else {
      actions.getEntities({ entity: searchFilter });
    }
  };

  render() {
    const { isSearching, searchQuery, searchFilter, filterOptions } = this.props;
    const selected = find(filterOptions, { value: searchFilter });

    return (
      <Form className={styles.searchForm} onSubmit={this.handleSearch}>
        <Input
          action
          focus={false}
          loading={isSearching}
          className={styles.searchInput}
        >
          <Icon loading={isSearching} name={selected.icon} />
          <input name="query" defaultValue={searchQuery} placeholder={`Buscar ${selected.text}`} />
          <Dropdown pointing="top left" icon="sliders" className={styles.filters}>
            <Dropdown.Menu>
              {filterOptions.map(option =>
                <Dropdown.Item
                  key={option.value}
                  selected={searchFilter === option.value}
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
