import React from 'react';
import { isEmpty, values } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Header, Icon, Label, Segment } from 'semantic-ui-react';
import * as actionCreators from '~/store/actions';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import styles from './details.scss';

class Details extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    isLogged: React.PropTypes.bool,
    user: React.PropTypes.object,
    skills: React.PropTypes.object,
  };

  componentDidMount() {
    if (this.props.isLogged) {
      this.props.actions.read({ entity: 'users' });
    }
  }

  render() {
    const { user, skills } = this.props;

    return (
      <Segment className={styles.wrapper}>
        <Container fluid>
          <FlexElement column style={{ marginBottom: 30 }}>
            <Header as="h5">
              <Icon name="clipboard" />
              <Header.Content>SOBRE MIM</Header.Content>
            </Header>
            <p>{user.description}</p>
          </FlexElement>
          <FlexElement column style={{ marginBottom: 30 }}>
            <Header as="h5">
              <Icon name="lightbulb" />
              <Header.Content>HABILIDADES</Header.Content>
            </Header>
            <Label.Group>
              {values(user.skills).map(skillID =>
                <Label key={skillID}>
                  {skills[skillID].name}
                </Label>,
              )}
            </Label.Group>
          </FlexElement>
        </Container>
      </Segment>
    );
  }
}

const mapStateToProps = (state, { params: { id } }) => ({
  isLogged: !isEmpty(selectors.getUser(state)),
  user: selectors.getEntities(state, 'users', id),
  skills: selectors.getEntities(state, 'skills'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

