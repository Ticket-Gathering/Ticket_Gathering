import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordPaySty from './OrderPay.module.css'
import {Space} from "antd";

export default class OrderPay extends Component{
    constructor(props) {
        super(props);
        this.state={
            receiverData:{name:'朱益成',tele:'12345678523',address:'Shanghai JiaoTong University'},
            orderData:{orderID:1023,name:'李荣浩2019「年少有为」巡回演唱会',time:'2020.08.02 周日 20:00',total:540}
        }
    }

    render() {
        return (
            <div>
                <SimpleNav/>
                <div className={ordPaySty.body}>
                    <div className={ordPaySty.Container}>
                        <div className={ordPaySty.imgContainer}>
                            <img src={require('../../ImgAssets/order_done.png')}/>
                        </div>
                        <div className={ordPaySty.infoContainer}>
                            <div className={ordPaySty.tipContainer}>
                                <span>订单提交成功！去付款咯~</span>
                                <span>
                                    收货信息：
                                    <Space>
                                        <span>{this.state.receiverData.name}</span>
                                        <span>{this.state.receiverData.tele.replace(/(.{3}).*(.{4})/,"$1****$2")}</span>
                                        <span>{this.state.receiverData.address}</span>
                                    </Space>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
