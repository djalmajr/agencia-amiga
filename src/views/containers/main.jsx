import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';
import { Loader } from 'semantic-ui-react';
import requireAuth from '~/helpers/require-auth';
import * as selectors from '~/store/selectors';
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

const Main = ({ isAuthorized, isLoadingState }) => {
  if (isLoadingState) {
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
      {isAuthorized && (
        <FlexElement>
          <TopBar />
        </FlexElement>
      )}
      <FlexElement full className={styles.content}>
        <Match pattern="/login" component={Login} />
        <Match pattern="/" exactly component={requireAuth(Feed)} />
        <Match pattern="/buscar" component={requireAuth(Buscar)} />
        <Match pattern="/campanhas/:id" component={requireAuth(Campanha)} />
        <Match pattern="/organizacoes/:id" component={requireAuth(Organizacao)} />
        <Match pattern="/voluntarios/:id" component={requireAuth(Usuario)} />
        <Match pattern="/servicos/:id" component={requireAuth(Servico)} />
      </FlexElement>
    </FlexElement>
  );
};

Main.propTypes = {
  isAuthorized: React.PropTypes.bool,
  isLoadingState: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthorized: selectors.isAuthenticated(state),
  isLoadingState: selectors.isLoadingState(state),
});

export default connect(mapStateToProps)(Main);
