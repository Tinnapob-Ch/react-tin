import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import {legacy_createStore as createStore} from "redux";
import{applyMiddleware} from "redux";
import reportWebVitals from './reportWebVitals';
import reduxThunk from "redux-thunk";
import reducers  from "./reducers";


const store = createStore(reducers,{},applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root'));

reportWebVitals();
