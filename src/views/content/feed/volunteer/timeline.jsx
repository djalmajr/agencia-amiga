import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Icon, Feed } from 'semantic-ui-react';
import FlexElement from '~/views/components/flex-element';
import selectors from '~/store/selectors';

const styles = {
  emptyContainer: { height: 300, fontSize: '1rem' },
  emptyContent: { maxWidth: 350 },
  emptyIcon: { color: 'rgba(0,0,0,0.1)', fontSize: '6em' },
  emptyText: { color: 'rgba(0,0,0,0.5)', marginTop: '1em', textAlign: 'center' },
};

const Timeline = ({ feed }) => {
  if (_.isEmpty(feed)) {
    return (
      <FlexElement column align="center" justify="center" style={styles.emptyContainer}>
        <FlexElement column align="center" justify="center" style={styles.emptyContent}>
          <Icon name="cloud" style={styles.emptyIcon} />
          <span style={styles.emptyText}>
            Está meio parado por aqui...
            Que tal procurar por voluntários, campanhas ou serviços?
          </span>
        </FlexElement>
      </FlexElement>
    );
  }

  return (
    <Feed>
      {_.keys(feed).sort().reverse().map(key =>
        <Feed.Event key={key} style={{ borderBottom: '1px solid #eee' }}>
          <Feed.Label>
            <Icon circular name={feed[key].icon} style={{ color: 'rgba(0,0,0,0.3)', fontSize: '1.4em' }} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date content={moment(parseInt(key, 10)).fromNow()} />
            <Feed.Summary>
              <span style={{ fontWeight: 'normal' }}>{feed[key].pretext}</span> {feed[key].text}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>,
      )}
    </Feed>
  );
};

Timeline.propTypes = {
  feed: React.PropTypes.object,
};

const mapStateToProps = state => ({
  feed: selectors.getFeed(state),
});

export default connect(mapStateToProps)(Timeline);
