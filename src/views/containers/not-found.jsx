import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';

const NotFound = ({ location }) => (
  <Segment full as={FlexElement}>
    <FlexElement full column align="center" justify="center">
      <FlexElement column align="center">
        <Icon name="cloud" size="massive" style={{ color: 'rgba(0,0,0,0.1)' }} />
        <span style={{ color: 'rgba(0,0,0,0.5)' }}>
          Página <strong>{location.pathname}</strong> não encontrada.
        </span>
      </FlexElement>
    </FlexElement>
  </Segment>
);

NotFound.propTypes = {
  location: React.PropTypes.object,
};

export default NotFound;
