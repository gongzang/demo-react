import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import HomeLayout from './layout/HomeLayout';
let title = 'Welcome';
ReactDOM.render((
    <Router>
        <HomeLayout title={title}>
            <Route exact path="/" component={HomePage} onEnter={() => alert('')} />
            <Route path="/user/add" component={UserAddPage} onEnter={() => alert(1)} />
            <Route path="/user/list" component={UserListPage} onEnter={() => alert(2)} />
        </HomeLayout>
    </Router>
), document.getElementById('app'));
