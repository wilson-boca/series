import React from "react";
import Router from "./Router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import combineReducers from "./reducers";

const store = createStore(
    combineReducers, 
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
const SeriesApp = prop => (
    <Provider store={store}>
        <Router />
    </Provider>
)

export default SeriesApp;