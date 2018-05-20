import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import BillAddPage from './pages/BillAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import BillListPage from './pages/BillList';
import HomeLayout from './layout/HomeLayout';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';


class App extends React.Component {
    render() {
        let title = 'Welcome';
        return (
            <Router>
                <HomeLayout title={title}>
                    <Route exact path="/" component={HomePage} onEnter={() => alert('')} />
                    <Route path="/user/add" component={UserAddPage} onEnter={() => alert(1)} />
                    <Route path="/user/list" component={UserListPage} onEnter={() => alert(2)} />
                    <Route path="/bill/list" component={BillListPage} onEnter={() => alert(2)} />
                    <Route path="/bill/add" component={BillAddPage} onEnter={() => alert(1)} />
                    <Route path="/user/edit/:id" component={UserEditPage} onEnter={() => alert(1)} />
                    <Route path="/book/add" component={BookAddPage} onEnter={() => alert(1)} />
                </HomeLayout>
            </Router>
        )
    }
}

export default App;