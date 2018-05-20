import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem'
import HTTPUtil from '../utils/HTTPUtil';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';

class BookEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendUsers: []
        };
    }

    getRecommendUsers(partialUserId) {
        HTTPUtil.get('/user?id_like=' + partialUserId)
            .then((res) => {
                if (res.length === 1 && res[0].id === partialUserId) {
                    // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
                    return;
                }

                // 设置建议列表
                this.setState({
                    recommendUsers: res.map((user) => {
                        return {
                            text: `${user.id}（${user.name}）`,
                            value: user.id
                        };
                    })
                });
            });
    }

    timer = 0;
    handleOwnerIdChange(e) {
        const {value} = e.target;
        this.props.onFormChange(e);
        this.setState({ recommendUsers: [] });

        // 使用“节流”的方式进行请求，防止用户输入的过程中过多地发送请求
        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (value) {
            // 200毫秒内只会发送1次请求
            this.timer = setTimeout(() => {
                // 真正的请求方法
                this.getRecommendUsers(value);
                this.timer = 0;
            }, 200);
        }
    }

    submit(e) {
        e.preventDefault();

        const { form: { name, price, owner_id }, formValid, editTarget } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }

        let editType = editTarget ? '编辑' : '添加';
        let method = editTarget ? 'put' : 'post';

        HTTPUtil[method]('/user' + (editTarget ? ('/' + editTarget.id) : ''), JSON.stringify({
            name: name.value,
            price: price.value,
            owner_id: owner_id.value
        }))
            .then((res) => {
                if (res.id) {
                    alert(`${editType}用户成功`);
                    // jumpToList();
                    return;
                } else {
                    alert(`${editType}失败`);
                }
            })
            .catch((err) => console.error(err));
    }

    jumpToList() {
        this.props.history.push('/user/list');
    }

    componentWillMount() {
        const { editTarget, setFormValues } = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }

    render() {
        const {recommendUsers} = this.state;
        const { form: { name, price, owner_id }, onFormChange } = this.props;
        return (
            <form onSubmit={(e) => this.submit(e)}>
                <FormItem label="书名:" valid={name.valid} error={name.error}>
                    <input type="text" name="name" value={name.value} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="价格:" valid={price.valid} error={price.error}>
                    <input type="text" name="price" value={price.value || ''} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="所有者:" valid={owner_id.valid} error={owner_id.error}>
                    <AutoComplete
                        name="owner_id"
                        value={owner_id.value ? owner_id.value + '' : ''}
                        options={recommendUsers}
                        onValueChange={(e) => this.handleOwnerIdChange(e)}
                    />
                </FormItem>
                <br />
                <br />
                <input type="submit" value="提交" />
            </form>
        )
    }
}

BookEditor = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入用户名'
            },
            {
                pattern: /^.{1,4}$/,
                error: '用户名最多4个字符'
            }
        ]
    },
    price: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value >= 1 && value <= 100;
                },
                error: '年龄必须在1-100范围内'
            }
        ]
    },
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择所有者'
            }
        ]
    }
})(BookEditor);

BookEditor.contextTypes = {
    router: PropTypes.object.isRequired
}

export default BookEditor;