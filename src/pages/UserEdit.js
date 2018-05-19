import React from 'react';
import UserEditor from '../components/UserEditor';
import HTTPUtil from '../utils/HTTPUtil';

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentWillMount() {
        const userId = this.props.match.params.id;
        HTTPUtil.get('/user/' + userId)
            .then(res => {
                this.setState({
                    user:res
                });
            });
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                {

                    user ? <UserEditor editTarget={user} /> : '加载中'
                }
            </div>
        );
    }
}

export default UserEdit;