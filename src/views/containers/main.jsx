import React from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Match } from 'react-router';
import { Loader } from 'semantic-ui-react';
import requireAuth from '~/helpers/require-auth';
import * as actionCreators from '~/store/actions';
import selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import Feed from '~/views/content/feed';
import Buscar from '~/views/content/buscar';
import Campanha from '~/views/content/campanha';
import Organizacao from '~/views/content/organizacao';
import Servico from '~/views/content/servico';
import Usuario from '~/views/content/usuario';
import Login from './login';
import Notification from './notification';
import TopBar from './topbar';
import styles from './main.scss';

class Main extends React.PureComponent {
  static propTypes = {
    actions: React.PropTypes.object,
    hasSkills: React.PropTypes.bool,
    isLogged: React.PropTypes.bool,
    isLoadingState: React.PropTypes.bool,
    user: React.PropTypes.object,
  };

  componentWillReceiveProps({ actions, hasSkills, isLogged, user }) {
    if (!isLogged) {
      return;
    }
    
    if (!hasSkills) {
      actions.read({ entity: 'skills' });
    }

    if (!user.id) {
    }
  }

  render() {
    const { isLogged, isLoadingState, user } = this.props;

    if (isLoadingState || !user.id) {
      return (
        <FlexElement column full align="center" justify="center" className={styles.wrapper}>
          <Loader active>
            <span style={{ color: 'rgba(0,0,0, 0.45)' }}>
              Carregando o sistema...
            </span>
          </Loader>
        </FlexElement>
      );
    }

    return (
      <FlexElement column className={styles.wrapper}>
        <Notification />
        {isLogged && <TopBar />}
        <FlexElement full className={styles.content}>
          <Match pattern="/" exactly component={requireAuth(Feed)} />
          <Match pattern="/login" component={Login} />
          <Match pattern="/buscar" component={requireAuth(Buscar)} />
          <Match pattern="/campanhas/:id" component={requireAuth(Campanha)} />
          <Match pattern="/organizacoes/:id" component={requireAuth(Organizacao)} />
          <Match pattern="/voluntarios/:id" component={requireAuth(Usuario)} />
          <Match pattern="/servicos/:id" component={requireAuth(Servico)} />
        </FlexElement>
      </FlexElement>
    );
  }
}

const mapStateToProps = state => ({
  hasSkills: !isEmpty(selectors.getEntities(state, 'skills')),
  isLogged: selectors.isAuthenticated(state),
  isLoadingState: selectors.isLoadingState(state),
  user: selectors.getUser(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
