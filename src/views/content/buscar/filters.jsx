import cn from 'classnames';
import React from 'react';
import latinize from 'latinize';
import { withRouter } from 'react-router';
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
    isFiltering: React.PropTypes.bool,
    entityFilter: React.PropTypes.string,
    // skillsFilter: React.PropTypes.array,
    push: React.PropTypes.func,
    skills: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  handleClear = () => {
    this.dropdown.setValue('');
    this.props.actions.updateFilter({ name: 'skills', value: [] });
  };

  handleSearch = () => {
    const skills = this.dropdown.state.value;

    this.props.actions.updateFilter({ name: 'skills', value: skills });

    this.applySearch(this.props.entityFilter);
  };

  handleFilterClick = (value) => {
    const { actions, push } = this.props;
    const { text } = find(Filter.OPTIONS, { value });
    const tipo = latinize(text).toLowerCase();

    push({ pathname: '/buscar', query: { tipo } });

    actions.updateFilter({ name: 'entity', value });
    this.applySearch(value);
  };

  applySearch(entity) {
    this.props.actions.read({ entity });
  }

  render() {
    const { isFiltering, entityFilter, skills } = this.props;

    return (
      <FlexElement column className={styles.wrapper}>
        <Segment>
          <FlexElement column className={styles.menu}>
            {Filter.OPTIONS.map(option =>
              <FlexElement
                align="center"
                key={option.value}
                className={cn(styles.menuItem, {
                  [styles.selected]: option.value === entityFilter,
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
                disabled={isFiltering}
                ref={el => (this.dropdown = el)}
                options={values(skills).map(({ name, uid }) => ({ text: name, value: uid }))}
                noResultsMessage="Nenhum registro encontrado"
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
                disabled={isFiltering}
                onClick={this.handleSearch}
              >
                Buscar
              </Button>
              <Button size="small" disabled={isFiltering} onClick={this.handleClear}>
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
  entityFilter: selectors.getEntityFilter(state),
  skillsFilter: selectors.getSkillsFilter(state),
  isFiltering: selectors.isFiltering(state),
  skills: selectors.getEntities('skills')(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Filters));
