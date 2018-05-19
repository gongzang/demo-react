import React from 'react';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem'
import HTTPUtil from '../utils/HTTPUtil';

class BillAdd extends React.Component {

    submit(e) {
        e.preventDefault();

        const { form: { name, amount,nper, type }, formValid } = this.props;
        if (!formValid) {
            alert('请填写正确的信息后重试!');
            return;
        }
        HTTPUtil.post('/bill', JSON.stringify({
            name: name.value,
            amount: amount.value,
            nper: nper.value,
            type: type.value
        }))
            .then((res) => {
                if (res.id) {
                    alert('添加账单成功');
                    this.setState({
                        name: '',
                        amount: 0,
                        nper: 0,
                        type: ''
                    });
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }

    render() {
        const { form: { name, amount,nper, type }, onFormChange } = this.props;
        return (
            <form onSubmit={(e) => this.submit(e)}>
                <FormItem label="银行:" valid={name.valid} error={name.error}>
                    <input type="text" name="name" value={name.value} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="金额:" valid={amount.valid} error={amount.error}>
                    <input type="text" name="amount" value={amount.value || ''} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="期数:" valid={nper.valid} error={nper.error}>
                    <input type="text" name="nper" value={nper.value || ''} onChange={(e) => onFormChange(e)} />
                </FormItem>
                <FormItem label="类型:" valid={type.valid} error={type.error}>
                    <select name="type" value={type.value} onChange={(e) => onFormChange(e)}>
                        <option value="">请选择</option>
                        <option value="信用卡">信用卡</option>
                        <option value="贷款">贷款</option>
                    </select>
                </FormItem>
                <br />
                <br />
                <input type="submit" value="提交" />
            </form>
        )
    }
}

BillAdd = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return value.length > 0;
                },
                error: '请输入银行名'
            }
        ]
    },
    amount: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return true;
                },
                error: '年龄必须在1-100范围内'
            }
        ]
    },
    type: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return !!value;
                },
                error: '请选择类型'
            }
        ]
    },
    nper: {
        defaultValue: '',
        rules: [
            {
                pattern: function (value) {
                    return true;
                },
                error: '请输入期数'
            }
        ]
    }
})(BillAdd);

export default BillAdd;