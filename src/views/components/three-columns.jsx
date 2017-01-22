import React from 'react';
import FlexElement from '~/views/components/flex-element';

const ThreeColumns = ({ content, panel, related }) => (
  <FlexElement full>
    <FlexElement column>
      {panel}
    </FlexElement>
    <FlexElement column full>
      {content}
    </FlexElement>
    <FlexElement column>
      {related}
    </FlexElement>
  </FlexElement>
);

ThreeColumns.propTypes = {
  content: React.PropTypes.node,
  panel: React.PropTypes.node,
  related: React.PropTypes.node,
};

export default ThreeColumns;
