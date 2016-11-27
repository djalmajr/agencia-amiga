import React from 'react';
import elementType from '~/react-prop-types/lib/elementType';

// Necessário para o uso do react-docgen
const DefaultProps = () => (
  <noscript />
);

DefaultProps.propTypes = {
  /**
   * Children nodes
   */
  children: React.PropTypes.node,

  // children: React.PropTypes.arrayOf(React.PropTypes.shape({
  //     type: React.PropTypes.oneOf([Button])
  // })),

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
  component: 'div',
  className: '',
  style: {},
};

export default DefaultProps;
