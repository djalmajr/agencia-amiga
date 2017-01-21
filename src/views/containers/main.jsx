import React from 'react';
import { connect } from 'react-redux';
import { Match, Miss } from 'react-router';
import requireAuth from '~/helpers/require-auth';
import * as selectors from '~/store/selectors';
import FlexElement from '~/views/components/flex-element';
import Buscar from '~/views/content/buscar';
import Campanha from '~/views/content/campanha';
import Organizacao from '~/views/content/organizacao';
import Servico from '~/views/content/servico';
import Usuario from '~/views/content/usuario';
import Login from './login';
import NotFound from './not-found';
import Notification from './notification';
import TopBar from './topbar';
import styles from './main.scss';

const Main = props => (
  <FlexElement column className={styles.main}>
    <Notification />
    {props.isAuthorized && (
      <FlexElement>
        <TopBar />
      </FlexElement>
    )}
    <FlexElement full className={styles.content}>
      <Match pattern="/login" component={Login} />
      <Match pattern="/logout" component={NotFound} />
      <Match pattern="/buscar" component={Buscar} />
      <Match pattern="/campanhas/:id" component={Campanha} />
      <Match pattern="/organizacoes/:id" component={Organizacao} />
      <Match pattern="/pessoas/:id" component={Usuario} />
      <Match pattern="/servicos/:id" component={Servico} />
      <Miss component={requireAuth(NotFound)} />
    </FlexElement>
  </FlexElement>
);

Main.propTypes = {
  isAuthorized: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthorized: selectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(Main);
