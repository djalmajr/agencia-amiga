import React from 'react';
import cn from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import { classnames } from '~/helpers/utilities';
import styles from './flex-column.scss';
import DefaultProps from '../default-props';

class FlexColumn extends React.Component {
  static propTypes = {
    ...DefaultProps.propTypes,

    /**
     * Alinhamento dos elementos filhos.
     */
    align: React.PropTypes.oneOf([
      'baseline', 'center', 'flex-end', 'flex-start', 'stretch',
    ]),

    /**
     * Se o elemento possui `flex:1`.
     */
    full: React.PropTypes.bool,

    /**
     * Espaçamento entre os elementos filhos.
     */
    justify: React.PropTypes.oneOf([
      'center', 'flex-end', 'flex-start',
      'inherit', 'initial', 'space-around', 'space-between',
    ]),

    onClick: React.PropTypes.func,
  };

  static defaultProps = {
    ...DefaultProps.defaultProps,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  get className() {
    const classes = {
      full: this.props.full,
      [`align-${this.props.align}`]: !!this.props.align,
      [`justify-${this.props.justify}`]: !!this.props.justify,
    };

    return cn(
      { [this.props.className]: this.props.className },
      classnames(styles, 'flex-column', classes),
    );
  }

  render() {
    const { children, component, style, onClick } = this.props;
    const props = { style, className: this.className, onClick };

    return React.createElement(component, props, children);
  }
}

export default FlexColumn;
