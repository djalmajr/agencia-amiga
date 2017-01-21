import React from 'react';
import FlexElement from '~/views/components/flex-element';

const Page = ({ left, content, right }) => (
  <FlexElement full>
    <FlexElement column>
      {React.createElement(left, null)}
    </FlexElement>
    <FlexElement column full>
      {React.createElement(content, null)}
    </FlexElement>
    <FlexElement column>
      {React.createElement(right, null)}
    </FlexElement>
  </FlexElement>
);

Page.propTypes = {
  left: React.PropTypes.element,
  content: React.PropTypes.element,
  right: React.PropTypes.element,
};

export default Page;
