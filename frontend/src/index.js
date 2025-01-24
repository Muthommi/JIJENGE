import React from 'React';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router } from 'react-router-dom';

ReactDom.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);
