import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Link to="/user/add">添加用户</Link>
                <br />
                <Link to="/user/list">用户列表</Link>
                <br />
                <Link to="/bill/add">添加账单</Link>
                <br />
                <Link to="/bill/list">账单列表</Link>
                <br />
                <Link to="/book/add">添加图书</Link>
            </div>
        );
    }
}

export default Home;