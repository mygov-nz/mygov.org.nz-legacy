import reducer from './reducer';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';

const middleware = [
    thunk
];

middleware.push(createLogger({
    collapsed: true
}));

export default createStore(reducer, applyMiddleware(...middleware));
