import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';

ReactDOM.render((
    <Router>
        aaa
        <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/user/add" component={UserAddPage} />
        </div>
    </Router>  
), document.getElementById('app'));
