import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import history from './history';
import reducer from './reducer';

const middleware = [
    thunk
];

middleware.push(createLogger({
    collapsed: true
}));

middleware.push(routerMiddleware(history));

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
