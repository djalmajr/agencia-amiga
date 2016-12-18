import React from 'react';
import elementType from 'react-prop-types/lib/elementType';

// Necessário para o uso do react-docgen
const DefaultProps = () => (
  <noscript />
);

DefaultProps.propTypes = {
  /**
   * Children nodes
   */
  children: React.PropTypes.node,

  /**
   * Custom CSS.
   */
  className: React.PropTypes.string,

  /**
   * Permite o uso de tags customizadas no componente.
   * Ex: `<DropdownMenu component={Button|"a"|"button"}>`
   */
  component: elementType,

  /**
   * Custom style.
   */
  style: React.PropTypes.object,
};

DefaultProps.defaultProps = {
  className: '',
  component: 'div',
  style: {},
};

export default DefaultProps;
