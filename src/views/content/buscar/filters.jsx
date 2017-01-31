import cn from 'classnames';
import React from 'react';
import latinize from 'latinize';
import { find, values } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Divider, Dropdown, Form, Header, Icon, Segment } from 'semantic-ui-react';
import { Filter } from '~/constants';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './filters.scss';

class Filters extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isSearching: React.PropTypes.bool,
    appliedFilter: React.PropTypes.object,
    skills: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleClear = () => {
    this.dropdown.setValue('');
    this.props.actions.updateFilter({ skills: null });
  };

  handleSearch = () => {
    const skills = this.dropdown.state.value;

    this.props.actions.updateFilter({ skills });

    this.applySearch(this.props.appliedFilter.filter);
  };

  handleFilterClick = (value) => {
    const { transitionTo } = this.context.router;
    const { actions } = this.props;
    const { text } = find(Filter.OPTIONS, { value });
    const slug = latinize(text).toLowerCase();

    transitionTo({
      pathname: '/buscar',
      query: value === 'all' ? null : { filtro: slug },
    });

    actions.updateFilter({ filter: value });
    this.applySearch(value);
  };

  applySearch(value) {
    const { read, readAll } = this.props.actions;

    if (value === 'all') {
      readAll();
    } else {
      read({ entity: value });
    }
  }

  render() {
    const { isSearching, appliedFilter, skills } = this.props;

    return (
      <FlexElement column className={styles.wrapper}>
        <Segment>
          <FlexElement column className={styles.menu}>
            {Filter.OPTIONS.map(option =>
              <FlexElement
                align="center"
                key={option.value}
                className={cn(styles.menuItem, {
                  [styles.selected]: option.value === appliedFilter.filter,
                })}
                onClick={() => this.handleFilterClick(option.value)}
              >
                <Icon name={option.icon} />
                <span style={{ marginLeft: '0.5em' }}>{option.text}</span>
              </FlexElement>,
            )}
          </FlexElement>
          <Divider />
          <FlexElement column>
            <Header as="h5">Filtrar por:</Header>
            <Form className={styles.searchForm} onSubmit={this.handleSearch}>
              <Dropdown
                fluid
                search
                multiple
                selection
                disabled={isSearching}
                ref={el => (this.dropdown = el)}
                noResultsMessage="Nenhum registro encontrado"
                options={values(skills).map(({ name, uid }) => ({ text: name, value: uid }))}
                placeholder="Habilidades..."
              />
              {/*
              <Input fluid placeholder="Localização..." style={{ marginTop: '1em' }} />
              */}
            </Form>
            <FlexElement justify="space-between" style={{ marginTop: '1em' }}>
              <Button
                primary
                size="small"
                type="submit"
                disabled={isSearching}
                onClick={this.handleSearch}
              >
                Buscar
              </Button>
              <Button size="small" disabled={isSearching} onClick={this.handleClear}>
                Limpar
              </Button>
            </FlexElement>
          </FlexElement>
        </Segment>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  appliedFilter: selectors.getAppliedFilter(state),
  isSearching: selectors.isSearching(state),
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
