/* global process */

import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const configureStore = function () {
    let store, middlewares = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== "production") {
        let {DevTools} = require("../devtools"),
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

        middlewares = composeEnhancers ?
            composeEnhancers(middlewares) :
            compose(middlewares, DevTools.instrument());
    }

    store = createStore(reducers, middlewares);

    return store;
};

export default configureStore;
