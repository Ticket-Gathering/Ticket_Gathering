import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordPaySty from './OrderPay.module.css'
import {Space, Divider, Button, message,Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import Axios from "axios";
const base_url='http://54.237.94.10:8080'
export default class OrderPay extends Component{
    constructor(props) {
        super(props);
        this.state={
            receiverData:{name:null,tele:"",address: null},
            orderData:{},
            payStatus:1,
            selected:'支付宝',
            loadSuccess:false
        }
    }
    componentDidMount() {
        Axios.get(base_url+'/getIndent?order_id='+this.props.match.params.orderID).then(
            res=>{
                console.log(res.data)
                let params=this.props.location.state?this.props.location.state:JSON.parse(sessionStorage.getItem('orderPayData'))
                this.setState({
                    receiverData:{name:res.data.receiver_name,address:res.data.receiver_address,tele:res.data.receiver_tel},
                    orderData:{orderID:res.data.orderId,name:params.name,time:res.data.selected_time,total:res.data.payamount,address:params.address},
                    payStatus:res.data.order_status,
                    loadSuccess:true
                })
            }
        )
    }
    pay=()=>{
        let data = new FormData();
        data.append("order_id", this.props.match.params.orderID);
        data.append("status",JSON.stringify(2));
        Axios.post(base_url+"/updateIndent", data).then(
            res=>{
                if(res.data==1) {
                    message.success("你已支付成功！")
                    this.setState({
                        payStatus: 2
                    })
                    this.props.history.push({pathname:'/'})
                }
            }
        )

    }
    cancelOrder=()=>{
        if(this.state.payStatus==2) return
        Modal.confirm({
            title: '请求确认',
            icon: <ExclamationCircleOutlined />,
            content: '你是否要取消订单？',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                let data = new FormData();
                data.append("order_id", this.props.match.params.orderID);
                data.append("status",JSON.stringify(3));
                Axios.post(base_url+"/updateIndent", data).then(
                    res=>{
                        if(res.data==1)
                            message.success("你已成功取消订单！")
                    }
                )
            }
        });
    }
    render() {
        if(!this.state.loadSuccess)return (<div>loading...</div>)
        else
        return (
            <div>
                <SimpleNav history={this.props.history}/>
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
                                    <span ><a className={ordPaySty.gray} onClick={this.cancelOrder}>取消订单</a></span>
                                </div>
                            </div>
                            <Divider/>
                            <div className={ordPaySty.row}>
                                <div className={ordPaySty.tipContainer}>
                                    <span style={{fontSize:16+'px',fontWeight:'bold'}}>订单详情</span>
                                    <span>订单号：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.orderID}</span></span>
                                    <span>票品信息：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.name}</span></span>
                                    <span>演出场次：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.time}</span></span>
                                    <span>演出地点：&nbsp;<span className={ordPaySty.gray}>{this.state.orderData.address}</span></span>
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
                    <Button type={'primary'} className={ordPaySty.buttonContainer} onClick={this.pay} disabled={this.state.payStatus==2}>
                        {this.state.payStatus==2?'订单已支付':'支付订单'}
                    </Button>
                </div>
            </div>
        );
    }
}
