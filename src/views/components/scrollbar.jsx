import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styles from './scrollbar.scss';

const Scrollbar = ({ children, innerRef, ...props }) => (
  <Scrollbars
    {...props}
    ref={innerRef}
    renderTrackVertical={({ style, ...innerProps }) => (
      <div {...innerProps} className={styles.scrollTrack} style={style} />
    )}
  >
    {children}
  </Scrollbars>
);

Scrollbar.propTypes = {
  children: React.PropTypes.node,
  innerRef: React.PropTypes.func,
};

export default Scrollbar;
