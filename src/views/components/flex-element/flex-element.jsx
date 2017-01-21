import React from 'react';
import cn from 'classnames';
import cnames from '~/helpers/cnames';
import styles from './flex-element.scss';
import DefaultProps from '../default-props';

class FlexElement extends React.PureComponent {
  static propTypes = {
    ...DefaultProps.propTypes,

    /**
     * Alinhamento dos elementos filhos.
     */
    align: React.PropTypes.oneOf([
      'baseline', 'center', 'flex-end', 'flex-start',
      'inherit', 'initial', 'stretch',
    ]),

    /**
     * Se o elemento possui `direction: column`.
     */
    column: React.PropTypes.bool,

    /**
     * Se o elemento possui `flex: 1`.
     */
    full: React.PropTypes.bool,

    /**
     * Espaçamento entre os elementos filhos.
     */
    justify: React.PropTypes.oneOf([
      'center', 'flex-end', 'flex-start',
      'inherit', 'initial', 'space-around', 'space-between',
    ]),

    /**
     * Se o elemento possui `flex-direction: row`.
     */
    row: React.PropTypes.bool,

    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    ...DefaultProps.defaultProps,
  };

  getClassName() {
    const classes = {
      flex: true,
      column: this.props.column,
      disabled: this.props.disabled,
      full: this.props.full,
      row: !this.props.column,
      [`align-${this.props.align}`]: !!this.props.align,
      [`justify-${this.props.justify}`]: !!this.props.justify,
    };

    return cn(
      { [this.props.className]: this.props.className },
      cnames(styles, classes),
    );
  }

  render() {
    const { children, component, innerRef, style, onClick } = this.props;
    const props = { ref: innerRef, style, className: this.getClassName(), onClick };

    return React.createElement(component, props, children);
  }
}

export default FlexElement;
