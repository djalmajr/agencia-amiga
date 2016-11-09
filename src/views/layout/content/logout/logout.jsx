import React from "react";
import UI from "@audora/ui";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {logoutAction} from "../../../actions";

class Logout extends React.Component<any, any> {
    componentDidMount() {
        this.props.dispatch(logoutAction());
    };

    render() {
        return (
            <UI.FlexColumn>
                Logging out...
            </UI.FlexColumn>
        );
    }
}

export default connect()(Logout);
