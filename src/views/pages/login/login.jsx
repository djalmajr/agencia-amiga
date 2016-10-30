import * as React from "react";
import * as UI from "@audora/ui";
import * as cn from "classnames";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {loginAction} from "../../../store/actions";
import {isLogged, isLogging} from "../../../store/selectors";

const logoAudora = require("./logo-150x158.png");
const styles = require("./login.scss");

interface LoginFields {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

class Login extends React.Component<any, any> {
    form: LoginFields = {
        username: null,
        password: null,
    };

    handleContinueAnyway = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onSignatureContinueAnyway();
    };

    handleLogin = (e: React.FormEvent | React.MouseEvent) => {
        const userName = this.form.username.value.trim();
        const password = this.form.password.value.trim();

        e.preventDefault();

        // Validar dados do formulário

        this.props.dispatch(loginAction(userName, password));
    };

    handleRecoveryPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onRecoveryPassword();
    };

    handleLoginCertificate = (e: React.MouseEvent) => {
        e.preventDefault();
        this.props.onLoginCertificate();
    };

    render() {
        const {isLogged, isLogging, location} = this.props;
        let {redirect} = location.state || {redirect: {pathname: "/"}};

        return (
            <UI.FlexColumn className={styles.wrapper}>
                {isLogged && (<Redirect to={redirect} />)}
                <img src={logoAudora} className={styles.logo} alt="Audora Gerencial" />
                <form className={styles.form} onSubmit={this.handleLogin}>
                    <UI.FlexColumn>
                        <input
                            ref={(el) => (this.form.username = el)}
                            type="text"
                            name="username"
                            className={styles.input}
                            disabled={isLogging}
                            placeholder="Email ou nome de usuário"
                        />
                        <input
                            ref={(el) => (this.form.password = el)}
                            type="password"
                            name="password"
                            placeholder="Senha"
                            disabled={isLogging}
                            className={styles.input}
                        />
                        <UI.Button
                            size="big"
                            type="submit"
                            color="primary"
                            className={cn({[styles.isLogging]: isLogging})}
                            disabled={isLogging}
                            onClick={this.handleLogin}
                        >
                            <UI.FlexRow align="center" justify="space-between">
                                <span>{isLogging ? "Autenticando..." : "Entrar"}</span>
                                <i className={isLogging ? "fa fa-refresh fa-spin" : "fa fa-sign-in"} />
                            </UI.FlexRow>
                        </UI.Button>
                    </UI.FlexColumn>
                </form>
                <a href="#" className={styles.link} onClick={this.handleRecoveryPassword}>
                    Esqueci minha senha
                </a>
                <a href="#" className={styles.link} onClick={this.handleLoginCertificate}>
                    Entrar com meu certificado digital
                </a>
            </UI.FlexColumn>
        );
    }
}

export default connect()(Login);
