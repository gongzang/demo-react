import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem'
import HTTPUtil from '../utils/HTTPUtil';
import PropTypes from 'prop-types';

class UserEditor extends React.Component{
    submit(e) {
        e.preventDefault();

        const { form: { name, age, gender }, formValid, editTarget } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }

        let editType = editTarget?'编辑':'添加';
        let method = editTarget?'put':'post';

        HTTPUtil[method]('/user'+(editTarget?('/'+editTarget.id):''), JSON.stringify({
            name: name.value,
            age: age.value,
            gender: gender.value
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

    jumpToList(){
        this.props.history.push('/user/list');
    }

    componentWillMount(){
        const {editTarget, setFormValues} = this.props;
        if(editTarget){
            setFormValues(editTarget);
        }
    }

    render() {
        const { form: { name, age, gender }, onFormChange } = this.props;
        return (
            <form onSubmit={(e) => this.submit(e)}>
                <FormItem label="用户名:" valid={name.valid} error={name.error}>
                    <input type="text" name="name" value={name.value} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="年龄:" valid={age.valid} error={age.error}>
                    <input type="text" name="age" value={age.value || ''} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="性别:" valid={gender.valid} error={gender.error}>
                    <select name="gender" value={gender.value} onChange={(e) => onFormChange(e)}>
                        <option value="">请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                </FormItem>
                <br />
                <br />
                <input type="submit" value="提交" />
            </form>
        )
    }
}

UserEditor = formProvider({
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
    age: {
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
    gender: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择性别'
            }
        ]
    }
})(UserEditor);

UserEditor.contextTypes = {
    router:PropTypes.object.isRequired
}

export default UserEditor;