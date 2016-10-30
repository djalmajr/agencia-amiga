import React from "react";
// import {fromJS} from "immutable";
import {connect} from "react-redux";
// import {Match, Redirect} from "react-router";

import styles from "./main.scss";

class Main extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div>TopBar</div>
                <div className={styles.container}>
                    Container
                </div>
            </div>
        );
    }
}

export default connect()(Main);
