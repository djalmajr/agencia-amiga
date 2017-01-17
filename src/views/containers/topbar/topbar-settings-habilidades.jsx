import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Habilidades = ({ value, options, onAddItem, onChange }) => (
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
    onAddItem={onAddItem}
    onChange={onChange}
  />
);

Habilidades.propTypes = {
  options: React.PropTypes.array,
  value: React.PropTypes.array,
  onAddItem: React.PropTypes.func,
  onChange: React.PropTypes.func,
};

export default Habilidades;
