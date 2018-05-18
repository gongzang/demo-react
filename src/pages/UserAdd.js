import React from 'react';

class UserAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                name: {
                    valid: false,
                    value: '',
                    error: ''
                },
                age: {
                    valid: false,
                    value: '',
                    error: ''
                },
                gender: {
                    valid: false,
                    value: '',
                    error: ''
                }
            }
        };
    }
    valueChange(e, type = "string") {
        var { name, value } = e.target;
        if (type === 'number') {
            value = +value;
        }

        const { form } = this.state;
        const newFieldObj = { value, valid: true, error: '' };

        switch (name) {
            case 'name': {
                if (value.length > 20) {
                    newFieldObj.error = "用户名最多20个字符";
                    newFieldObj.valid = false;
                } else if (value.length === 0) {
                    newFieldObj.error = "请输入用户名";
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'age': {
                if (value > 100 || value < 0) {
                    newFieldObj.error = "请输入1~100之间的数字";
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'name': {
                if (!value) {
                    newFieldObj.error = "请选择性别";
                    newFieldObj.valid = false;
                }
                break;
            }
        }


        this.setState({
            form: {
                ...form,
                [name]: newFieldObj
            }
        });
    }
    submit(e) {
        e.preventDefault();

        const { form: { name, age, gender } } = this.state;
        if(!name.valid || !age.valid || !gender.valid){
            alert('请填写正确的信息后重试!');
            return;
        }
        fetch('http://localhost:3010/user', {
            method: 'post',
            body: JSON.stringify({
                name:name.value,
                age:age.value,
                gender:gender.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                    alert('添加用户成功');
                    this.setState({
                        name: '',
                        age: 0,
                        gender: ''
                    });
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }

    render() {
        const { form: { name, age, gender } } = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>
                <main>
                    <form onSubmit={(e) => this.submit(e)}>
                        <label>用户名:</label>
                        <input type="text" name="name" value={name.value} onChange={(e) => this.valueChange(e)} />
                        {!name.valid&&<span>{name.error}</span>}
                        <br />
                        <label>年龄:</label>
                        <input type="text" name="age" value={age.value || ''} onChange={(e) => this.valueChange(e, 'number')} />
                        {!age.valid&&<span>{age.error}</span>}
                        <br />
                        <label>性别:</label>
                        <select name="gender" value={gender.value} onChange={(e) => this.valueChange(e)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        {!gender.valid&&<span>{gender.error}</span>}
                        <br />
                        <br />
                        <input type="submit" value="提交" />
                    </form>
                </main>
            </div>
        )
    }
}

export default UserAdd;