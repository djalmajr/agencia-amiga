/* global process */

import React from "react";
import {Provider} from "react-redux";
import {HashRouter, Match} from "react-router";
import Main from "./views/layout/main";

const Application = ({store}) => {
    let DevTools = null;

    if (process.env.NODE_ENV !== "production") {
        const {showDevTools} = require("./devtools");

        if (!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            showDevTools(store);
            // DevTools = require("./devtools").DevTools;
        }
    }

    return (
        <Provider store={store}>
            <HashRouter>
                <div>
                    <Match pattern="/" component={Main} />
                    {DevTools && <DevTools store={store} />}
                </div>
            </HashRouter>
        </Provider>
    );
};

Application.propTypes = {
    store: React.PropTypes.object,
};

export default Application;
