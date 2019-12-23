import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import Editar from './Editar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
var logos = [];
const routing = (
    <Router>
        <div>
            <Route  path="/" component={Main} /> 
            <Route  path="/editar" component={Editar} />
        </div>
    </Router>
)
if (document.getElementById('app')) {
    ReactDOM.render(routing, document.getElementById('app'));
}

resources/assets/js/components/App.js

