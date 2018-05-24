import React from "react";
import ReactDOM from "react-dom";
import style from "./main.css";
import axios from 'axios';
import {BrowserRouter, Route, browserHistory, Link} from "react-router-dom";
import App from './components/App';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, document.getElementById('root')
);