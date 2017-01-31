import React from 'react';
import latinize from 'latinize';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Icon, Input, Dropdown } from 'semantic-ui-react';
import { Filter } from '~/constants';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import styles from './search.scss';

class TopBarSearch extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isSearching: React.PropTypes.bool,
    selectedFilter: React.PropTypes.object,
    searchQuery: React.PropTypes.string,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleFilterClick = (evt, { value }) => {
    evt.preventDefault();

    this.props.actions.updateFilter({ filter: value });
  };

  handleSearch = (evt, { query }) => {
    const { actions, selectedFilter } = this.props;
    const { text } = find(Filter.OPTIONS, { value: selectedFilter.filter });
    const slug = latinize(text).toLowerCase();

    evt.preventDefault();

    actions.search(query);

    this.context.router.transitionTo({
      pathname: '/buscar',
      query: selectedFilter.filter === 'all' ? null : { filtro: slug },
    });
  };

  render() {
    const { isSearching, searchQuery, selectedFilter } = this.props;
    const selected = find(Filter.OPTIONS, { value: selectedFilter.filter });

    return (
      <Form className={styles.searchForm} onSubmit={this.handleSearch}>
        <Input action focus={false} className={styles.searchInput}>
          <Icon name={selected.icon} />
          <input name="query" defaultValue={searchQuery} placeholder={`Buscar ${selected.text}`} />
          <Dropdown pointing="top left" icon="sliders" className={styles.filters}>
            <Dropdown.Menu>
              {Filter.OPTIONS.map(option =>
                <Dropdown.Item
                  key={option.value}
                  selected={selectedFilter.filter === option.value}
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
  isSearching: selectors.isSearching(state),
  selectedFilter: selectors.getSelectedFilter(state),
  searchQuery: selectors.getSearchQuery(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBarSearch);
