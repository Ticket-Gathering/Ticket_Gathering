import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordPaySty from './OrderPay.module.css'
import {Space,Divider} from "antd";

export default class OrderPay extends Component{
    constructor(props) {
        super(props);
        this.state={
            receiverData:{name:'朱益成',tele:'12345678523',address:'Shanghai JiaoTong University'},
            orderData:{orderID:1023,name:'李荣浩2019「年少有为」巡回演唱会',time:'2020.08.02 周日 20:00',total:540},
            selected:'支付宝'
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
                            <div className={ordPaySty.row}>
                                <div className={ordPaySty.tipContainer}>
                                    <span className={ordPaySty.bigText}>订单提交成功！去付款咯~</span>
                                    <span>
                                        收货信息：
                                        <Space>
                                            <span className={ordPaySty.gray}>{this.state.receiverData.name}</span>
                                            <span className={ordPaySty.gray}>{this.state.receiverData.tele.replace(/(.{3}).*(.{4})/,"$1****$2")}</span>
                                            <span className={ordPaySty.gray}>{this.state.receiverData.address}</span>
                                        </Space>
                                    </span>
                                </div>

                                <div className={ordPaySty.rightContainer}>
                                    <span className={ordPaySty.price}>
                                        应付总金额：{this.state.orderData.total.toFixed(2)}元
                                    </span>
                                </div>
                            </div>
                            <Divider/>
                            <div className={ordPaySty.row}>
                                <div className={ordPaySty.tipContainer}>
                                    <span style={{fontSize:16+'px',fontWeight:'bold'}}>订单详情</span>
                                    <span>订单号：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.orderID}</span></span>
                                    <span>票品信息：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.name}</span></span>
                                    <span>演出场次：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.time}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span style={{fontSize:16+'px',fontWeight:'bold'}}>请选择支付方式:</span>
                    <div className={ordPaySty.payment}>
                        <div className={ordPaySty.paymentItem+' '+(this.state.selected=='支付宝'?ordPaySty.selected:ordPaySty.unselected)} onClick={()=>this.setState({selected:'支付宝'})}>
                            <img src={require('../../ImgAssets/alipay.png')} className={ordPaySty.paymentItemImg}/>
                        </div>
                        <div className={ordPaySty.paymentItem+' '+(this.state.selected=='微信支付'?ordPaySty.selected:ordPaySty.unselected)} onClick={()=>this.setState({selected:'微信支付'})} >
                            <img src={require('../../ImgAssets/weixinpay.jpg')} className={ordPaySty.paymentItemImg} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
