import React from 'react';
import { Icon, Feed } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

const Timeline = ({ isEmpty }) => {
  if (isEmpty) {
    return (
      <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
        <Icon name="cloud" style={styles.emptyIcon} />
        <span style={styles.emptyText}>
          Está meio parado por aqui...
          Que tal procurar por voluntários?
        </span>
      </FlexElement>
    );
  }

  return (
    <Feed>
      <Feed.Event>
        <Feed.Label image="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
        <Feed.Content>
          <Feed.Date content="1 day ago" />
          <Feed.Summary>
            You added <a>Jenny Hess</a> to your <a>coworker</a> group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label image="http://semantic-ui.com/images/avatar2/small/molly.png" />
        <Feed.Content>
          <Feed.Date content="3 days ago" />
          <Feed.Summary>
            You added <a>Molly Malone</a> as a friend.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
      <Feed.Event>
        <Feed.Label image="http://semantic-ui.com/images/avatar/small/elliot.jpg" />
        <Feed.Content>
          <Feed.Date content="4 days ago" />
          <Feed.Summary>
            You added <a>Elliot Baker</a> to your <a>musicians</a> group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

Timeline.propTypes = {
  isEmpty: React.PropTypes.bool,
};

Timeline.defaultProps = {
  isEmpty: true,
};

export default Timeline;
