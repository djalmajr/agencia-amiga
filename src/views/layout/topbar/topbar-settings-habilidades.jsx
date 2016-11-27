import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Habilidades = ({ value, options }) => (
  <Dropdown
    fluid
    search
    multiple
    selection
    allowAdditions
    placeholder="Digite suas habilidades"
    noResultsMessage="Nenhum resultado encontrado"
    value={value}
    options={options}
    onAddItem={this.props.onAddItem}
    onChange={this.props.onChange}
  />
);

Habilidades.propTypes = {
  options: React.PropTypes.array,
  value: React.PropTypes.array,
  // onAddItem: React.PropTypes.func,
  // onChange: React.PropTypes.func,
};

export default Habilidades;
