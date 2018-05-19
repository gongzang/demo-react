import React from 'react';
import HTTPUtil from '../utils/HTTPUtil';

class BillList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            billList: [],
            billPerMonList: [],
            billSum: []
        };
    }
    componentWillMount() {
        HTTPUtil.get('/bill')
            .then(res => {
                let date = new Date();
                let billPerMonList = [];
                let billSum = [];
                for (let i = 0; i < 24; i++) {
                    let mon = date.getMonth() + 2 + i;
                    let yyyymm = '';
                    if (mon > 12) {
                        yyyymm += date.getFullYear() + 1;
                        yyyymm += '-';
                        yyyymm += mon - 12;
                    } else {
                        yyyymm += date.getFullYear();
                        yyyymm += '-';
                        yyyymm += mon;

                    }
                    billPerMonList.push({
                        mon: yyyymm
                    });
                    let banks = {};
                    let sum1 = 0;
                    let sum2 = 0;
                    for (let bill of res) {
                        if (bill.nper - i - 1 >= 0) {
                            banks[bill.name] = banks[bill.name] || [];
                            banks[bill.name].push({
                                amount: bill.amount,
                                nper: bill.nper - i - 1,
                                type: bill.type
                            });
                            if (bill.type === '信用卡') {
                                sum1 += parseFloat(bill.amount);
                            } else {
                                sum2 += parseFloat(bill.amount);
                            }
                        }

                    }
                    for (let name in banks) {
                        billPerMonList.push({
                            name
                        });
                        let amountSum1 = 0;
                        let amountSum2 = 0;
                        for (let bill of banks[name]) {
                            if (bill.type === '信用卡') {
                                amountSum1 += parseFloat(bill.amount);
                            } else {
                                amountSum2 += parseFloat(bill.amount);
                            }
                        }
                        billPerMonList = billPerMonList.concat(banks[name]);
                        billPerMonList.push({
                            amount: '信用卡：' + amountSum1.toFixed(2) + ' 贷款：' + amountSum2.toFixed(2) + ' 总共 ' + (amountSum1 + amountSum2).toFixed(2)
                        });
                    }
                    billPerMonList.push({
                        amount: '---信用卡：' + sum1.toFixed(2) + ' 贷款：' + sum2.toFixed(2) + ' 总共 ' + (sum1 + sum2).toFixed(2) + '---'
                    });
                    billSum.push({
                        mon: yyyymm,
                        amount: sum1.toFixed(2)
                    });
                }

                this.setState({
                    billList: res,
                    billPerMonList,
                    billSum
                });
            });
    }
    edit(bill) {

    }
    delete(bill) {
        const confirmed = window.confirm(`确定要删除账单 ${bill.name} 吗？`);
        if (confirmed) {
            HTTPUtil.delete('/bill', bill.id)
                .then(res => {
                    this.setState({
                        billList: this.state.billList.filter(item => item.id !== bill.id)
                    });
                    alert('删除账单成功');
                })
                .catch(err => {
                    console.error(err);
                    alert('删除账单失败');
                });
        }
    }
    render() {
        const { billList, billPerMonList, billSum } = this.state;
        return (

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>账单ID</th>
                            <th>银行名</th>
                            <th>金额</th>
                            <th>期数</th>
                            <th>类型</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billList.map((bill) => {
                                return (
                                    <tr key={bill.id}>
                                        <td>{bill.id}</td>
                                        <td>{bill.name}</td>
                                        <td>{bill.amount}</td>
                                        <td>{bill.nper}</td>
                                        <td>{bill.type}</td>
                                        <td>
                                            <a href="javascript:void(0)" onClick={() => this.edit(bill)}>编辑</a>
                                            &nbsp;
                                        <a href="javascript:void(0)" onClick={() => this.delete(bill)}>删除</a>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>月份</th>
                            <th>银行名</th>
                            <th>金额</th>
                            <th>剩余期数</th>
                            <th>类型</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billPerMonList.map((mon) => {
                                return (
                                    <tr key={mon.mon}>
                                        <td>{mon.mon}</td>
                                        <td>{mon.name}</td>
                                        <td>{mon.amount}</td>
                                        <td>{mon.nper}</td>
                                        <td>{mon.type}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>月份</th>
                            <th>金额</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            billSum.map((mon) => {
                                return (
                                    <tr key={mon.mon}>
                                        <td>{mon.mon}</td>
                                        <td>{mon.amount}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default BillList;