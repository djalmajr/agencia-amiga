/* global process */

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter, Match} from "react-router";
import Main from "./views/layout/main";
import configureStore from "./store/configure-store";

const store = configureStore();

const Application = () => {
    let DevTools = null;

    if (process.env.NODE_ENV !== "production") {
        const {showDevTools} = require("./devtools");

        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
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

ReactDOM.render(<Application />, document.querySelector("#wrapper"));
