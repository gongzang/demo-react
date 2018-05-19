import React from 'react';
import HTTPUtil from '../utils/HTTPUtil';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }
    componentWillMount() {
        HTTPUtil.get('/user')
            .then(res => {

                this.setState({
                    userList: res
                });
            });
    }
    edit(user) {
        this.props.history.push('/user/edit/' + user.id);
    }
    delete(user) {
        const confirmed = window.confirm(`确定要删除用户 ${user.name} 吗？`);
        if (confirmed) {
            HTTPUtil.delete('/user', user.id)
                .then(res => {
                    this.setState({
                        userList: this.state.userList.filter(item => item.id !== user.id)
                    });
                    alert('删除用户成功');
                })
                .catch(err => {
                    console.error(err);
                    alert('删除用户失败');
                });
        }
    }
    render() {
        const { userList } = this.state;
        return (

            <table>
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>用户名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>
                                        <a href="javascript:void(0)" onClick={() => this.edit(user)}>编辑</a>
                                        &nbsp;
                                        <a href="javascript:void(0)" onClick={() => this.delete(user)}>删除</a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }
}

UserList.contextTypes = {
    router:PropTypes.object.isRequired
}

export default UserList;