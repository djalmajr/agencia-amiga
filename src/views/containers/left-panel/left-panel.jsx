import cn from 'classnames';
import React from 'react';
import latinize from 'latinize';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Divider, Dropdown, Form, Header, Icon, Input, Segment } from 'semantic-ui-react';
import actionCreatos from '~/store/actions';
import selectors from '~/store/selectors';
import FlexColumn from '~/views/components/flex-column';
import FlexRow from '~/views/components/flex-row';
import styles from './left-panel.scss';

class LeftPanel extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    filterOptions: React.PropTypes.array,
    isSearching: React.PropTypes.bool,
    searchFilter: React.PropTypes.string,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleFilterClick = (value) => {
    const { actions, filterOptions } = this.props;
    const { text } = find(filterOptions, { value });
    const slug = latinize(text).toLowerCase();

    this.context.router.transitionTo({
      pathname: '/buscar',
      query: value === 'all' ? null : { filtro: slug },
    });

    actions.changeSearchFilter(value);
    actions.getEntities({ entity: value });
  };

  render() {
    const { isSearching, searchFilter, filterOptions } = this.props;
    const habilidades = [
      { text: 'Eletricista', value: 'Eletricista' },
      { text: 'Encanador', value: 'Encanador' },
      { text: 'Mecânico', value: 'Mecânico' },
      { text: 'Pedreiro', value: 'Pedreiro' },
    ];

    return (
      <FlexColumn className={styles.leftPanel}>
        <Segment>
          <FlexColumn className={styles.menu}>
            {filterOptions.map(option =>
              <FlexRow
                align="center"
                key={option.value}
                className={cn(styles.menuItem, {
                  [styles.selected]: option.value === searchFilter,
                })}
                onClick={() => this.handleFilterClick(option.value)}
              >
                <Icon name={option.icon} />
                <span style={{ marginLeft: '0.5em' }}>{option.text}</span>
              </FlexRow>,
            )}
          </FlexColumn>
          <Divider />
          <FlexColumn>
            <Header as="h5">Filtrar por:</Header>
            <Form className={styles.searchForm} onSubmit={this.handleSearch}>
              <Dropdown
                fluid
                search
                multiple
                selection
                options={habilidades}
                placeholder="Habilidades..."
              />
              <Input fluid placeholder="Localização..." style={{ marginTop: '1em' }} />
            </Form>
            <FlexRow justify="space-between" style={{ marginTop: '1em' }}>
              <Button primary type="submit" size="small" disabled={isSearching}>
                Buscar
              </Button>
              <Button size="small" disabled={isSearching}>
                Limpar
              </Button>
            </FlexRow>
          </FlexColumn>
        </Segment>
      </FlexColumn>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: selectors.getSearchStatus(state),
  filterOptions: selectors.getFilterOptions(state),
  searchFilter: selectors.getSearchFilter(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreatos, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
