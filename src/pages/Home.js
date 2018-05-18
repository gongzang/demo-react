import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Link to="/user/add">添加用户</Link>
                <Link to="/user/list">用户列表</Link>
            </div>
        );
    }
}

export default Home;