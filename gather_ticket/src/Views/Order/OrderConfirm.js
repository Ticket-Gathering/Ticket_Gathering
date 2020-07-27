import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordConfSty from "./OrderConfirm.module.css"
import {Divider, Input, Button, Drawer, Radio, Descriptions, Checkbox, Card, Modal, Form, Select, message} from "antd";
import Axios from '../../Module/Axios';
import {UserOutlined,PhoneOutlined,EnvironmentOutlined,PlusOutlined} from "@ant-design/icons";
import qs from 'qs'
import {Link} from "react-router-dom";
import Cookies from "js-cookie"

const base_url='http://localhost:8080'
const { Option } = Select;
export default class OrderConfirm extends Component{
    constructor(props) {
        super(props);
        this.state= {
            formValue:null,
            watcherModalVisible:false,
            watcherValue:[],        //选取的观影人
            receiverValue:0,        //选取的收票人
            visible:false,
            data: this.props.location.state?this.props.location.state:JSON.parse(sessionStorage.getItem('orderInfo')),
            total: 0,
            payAmount: 0,
            buyerName: null,
            buyerPhone: null,
            buyerAddress: null,
            receiverList: [],
            watcherList: [],
            receiver: null,
            watchers: [],
            MoreWatchers:[],
            checked:false
        }
    }
    componentDidMount() {
        let userId=Cookies.get('userId')
        console.log(this.props.match)
        if(isNaN(parseInt(userId))){
            this.props.history.push({pathname:'/login',state:{lastUrl:this.props.match.url}})
        }
        this.setState({
            total:parseInt(this.state.data.price)*this.state.data.num,
        },()=>{this.setState({
            payAmount:this.state.total-this.state.data.coupon
        })})
        Axios.get(base_url+'/getUserById/'+ userId)
            .then(
            res=>{
                this.setState({
                    receiverList:res.data.receiverList,
                    watcherList:res.data.ticketHolderList,
                })
            }
        )
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    onChangeReceiver = e => {
        this.setState({
            receiverValue: e.target.value,
        });
    };
    onChangeWatcher = checkList =>{
        this.setState({
            watcherValue:checkList
        })

    }
    onConfirm =()=>{
        let selected=this.state.receiverValue
        this.setState({
            buyerName:this.state.receiverList[selected].receiver,
            buyerPhone:this.state.receiverList[selected].tel,
            buyerAddress:this.state.receiverList[selected].address,
            visible:false
        })
    }
    openWatcherMore = () =>{
        this.setState({
            watcherModalVisible:true
        })
    }
    closeWatcherMore = ()=>{
        this.setState({
            watcherModalVisible:false,
            formValue:null
        })
    }
    addWatcher = () =>{
        let tempArr=[...this.state.MoreWatchers]
        tempArr.push(this.state.formValue)
        this.setState({
            formValue:null,
            MoreWatchers:tempArr,
            watcherModalVisible:false
        })
    }
    pay = () =>{
        if(this.state.buyerAddress == null||this.state.buyerPhone==null) {
            message.error('请填写完整的取票人信息！')
            return
        }
        if(this.state.watcherValue.length<1&&this.state.MoreWatchers.length<1){
            message.error('至少需要填写一位观影人的信息！')
            return;
        }
        if(!this.state.checked){
            message.error('请阅读相关协议后进行勾选！')
            return;
        }
        console.log(this.state.data.platform)
        Axios.post(base_url+'/addIndent',qs.stringify(
    {username:Cookies.get('username'),
            show_id:this.state.data.id,
            facevalue:this.state.data.price,
            num:this.state.data.num,
            payamount:this.state.payAmount,
            receiver_name:this.state.buyerName,
            receiver_tel:this.state.buyerPhone,
            receiver_address:this.state.buyerAddress,
            platform:'大麦网',
            selected_time:this.state.data.time
            })).then(
                res=>{
                    let orderPayData={
                        name:this.state.data.name,
                        address:this.state.data.address
                    }
                    sessionStorage.setItem('orderPayData',orderPayData)
                    this.props.history.push({pathname:'/orderPay'+`/${res.data}`,state:orderPayData} )
                }
            )
    }
    render() {
        const options=[]
        for(let index in this.state.watcherList){
            options.push({label:this.state.watcherList[index].name,value:index})
        }
        return (
            <div>
                <SimpleNav history={this.props.history}/>
                <div className={ordConfSty.body}>
                    <div className={ordConfSty.container}>
                        <div className={ordConfSty.buyerInfoContainer}>
                            <div className={ordConfSty.header}>
                                <div className={ordConfSty.headerItem}>
                                    <span >
                                        {this.state.data.ticketType}
                                    </span>
                                </div>
                            </div>

                            <div  className={ordConfSty.InputContainer}>
                                <span className={ordConfSty.watcherHeader}>取票人:</span>
                                    <Input prefix={<UserOutlined/>} placeholder={'请输入取票人姓名'} onChange={(e)=>this.setState({buyerName:e.target.value})} style={{marginTop:10+'px'}} value={this.state.buyerName}/>
                                    <Input prefix={<PhoneOutlined/>} placeholder={'请输入取票人联系方式'}  onChange={(e)=>this.setState({buyerPhone:e.target.value})} style={{marginTop:10+'px'}} value={this.state.buyerPhone}/>
                                    <Input prefix={<EnvironmentOutlined/>} placeholder={'请输入取票人地址'}  onChange={(e)=>this.setState({buyerAddress:e.target.value})} style={{marginTop:10+'px'}} value={this.state.buyerAddress}/>
                                    <Button type="primary" onClick={this.showDrawer} style={{marginTop:10+'px'}}>
                                        <PlusOutlined /> 添加取票人
                                    </Button>
                                <Drawer
                                    className={ordConfSty.siteFormInDrawerWrapper}
                                    title="从账户中添加取票人"
                                    width={720}
                                    onClose={this.onClose}
                                    visible={this.state.visible}
                                    bodyStyle={{paddingBottom:80}}
                                    footer={
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                                取消
                                            </Button>
                                            <Button onClick={this.onConfirm} type="primary">
                                                确认
                                            </Button>
                                        </div>
                                    }

                                >
                                    <Radio.Group onChange={this.onChangeReceiver} value={this.state.receiverValue} >
                                        {
                                            this.state.receiverList.map((item,index)=>{
                                                return(
                                                <Radio className={ordConfSty.radioStyle} value={index} key={index}>
                                                    {index+1}号
                                                    <Descriptions column={2} bordered style={{marginTop:20+'px'}}>
                                                        <Descriptions.Item label={'姓名'} span={1}>
                                                            {item.receiver}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={'电话号码'} span={1}>
                                                            {item.tel}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label={'地址'} span={2}>
                                                            {item.address}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                </Radio>
                                                )
                                            })
                                        }
                                    </Radio.Group>
                                </Drawer>
                            </div>

                            <Divider/>
                            <div className={ordConfSty.watcherContainer}>
                                <span className={ordConfSty.watcherHeader}>观影人:</span>
                                <Checkbox.Group options={options} onChange={this.onChangeWatcher}/>
                                <Divider/>
                                <div className={ordConfSty.row}>
                                    {
                                        this.state.watcherValue.map((item,index)=>{
                                            let info=this.state.watcherList[item]
                                            return(
                                                <div className={ordConfSty.watcherItemContainer}>
                                                    <Card title={`观影人${index+1}号`}>
                                                        <div className={ordConfSty.cardContent}>
                                                            <span>观影人姓名：{info.name}</span>
                                                            <span>证件类型：&nbsp;{info.idType=='ID-card'?'身份证':'护照'}</span>
                                                            <span>证件号码：&nbsp;{info.idNum.replace(/(.{5}).*(.{5})/,"$1******$2")}</span>
                                                        </div>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        this.state.MoreWatchers.map((item,index)=>{
                                            return(
                                                <div className={ordConfSty.watcherItemContainer}>
                                                    <Card title={`观影人${index+1+this.state.watcherValue.length}号`}>
                                                        <div className={ordConfSty.cardContent}>
                                                            <span>观影人姓名：{item.name}</span>
                                                            <span>证件类型：&nbsp;{item.IdType=='身份证'?'身份证':'护照'}</span>
                                                            <span>证件号码：&nbsp;{item.IdNum.replace(/(.{5}).*(.{5})/,"$1******$2")}</span>
                                                        </div>
                                                    </Card>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={ordConfSty.watcherItemContainer}>
                                        <Card title={'添加更多观影人'}>
                                            <div className={ordConfSty.cardContent} onClick={this.openWatcherMore}>
                                                <PlusOutlined className={ordConfSty.plusBig}/>
                                            </div>
                                        </Card>
                                    </div>
                                    <Modal
                                        title="自定义添加观影人"
                                        visible={this.state.watcherModalVisible}
                                        onCancel={this.closeWatcherMore}
                                        footer={[
                                            <Button key="back" onClick={this.closeWatcherMore}>
                                                取消
                                            </Button>,
                                            <Button key="confirm" type="primary"onClick={this.addWatcher}>
                                                确认
                                            </Button>,
                                        ]}
                                    >
                                        <Form onValuesChange={(_,values)=>this.setState({formValue:values})}>
                                            <Form.Item
                                                name="name"
                                                label="观影人姓名"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                name="IdType"
                                                label="证件类型"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Select style={{ width: 120 }}>
                                                    <Option value="身份证">身份证</Option>
                                                    <Option value="护照">护照</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name="IdNum"
                                                label="证件号码"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </div>
                                <Divider/>
                            </div>
                        </div>

                        <div className={ordConfSty.tickerInfoContainer}>
                            <div className={ordConfSty.imgAndNameContainer}>
                                <div className={ordConfSty.imgContainer}>
                                    <img src={this.state.data.img_url}/>
                                </div>
                                <div className={ordConfSty.nameContainer}>
                                    <span>
                                        {this.state.data.name}
                                    </span>
                                </div>
                            </div>
                            <Divider/>
                            <div className={ordConfSty.basicInfoContainer}>
                                <span>
                                    票面：
                                    <span className={ordConfSty.gray}>
                                        {this.state.data.price}
                                        <Divider type={'vertical'}/>
                                        {this.state.data.faceValue}
                                    </span>
                                </span>
                                <span>
                                    地点：
                                    <span className={ordConfSty.gray}>
                                        {this.state.data.address}
                                    </span>
                                </span>
                                <span>
                                    时间：
                                    <span className={ordConfSty.gray}>
                                        {this.state.data.time}
                                    </span>
                                </span>
                                <span>
                                    数量：
                                    <span className={ordConfSty.gray}>
                                        {this.state.data.num}&nbsp;张
                                    </span>
                                </span>
                            </div>
                            <Divider/>
                            <div className={ordConfSty.basicInfoContainer} >
                                <span>
                                   票款：
                                    <span className={ordConfSty.gray+' '+ordConfSty.rightAlign}>
                                        {this.state.total}元
                                    </span>
                                </span>
                                <span>
                                   优惠/抵用：
                                    <span className={ordConfSty.red+' '+ordConfSty.rightAlign}>
                                        -{this.state.data.coupon}元
                                    </span>
                                </span>
                                <span>
                                   订单总额：
                                    <span className={ordConfSty.gray+' '+ordConfSty.rightAlign}>
                                        {this.state.payAmount}元
                                    </span>
                                </span>
                            </div>
                            <Divider/>
                            <div className={ordConfSty.basicInfoContainer}>
                                 <span>
                                    实付款：
                                    <span className={ordConfSty.red+' '+ordConfSty.rightAlign} style={{fontSize:18+'px'}}>
                                        {this.state.payAmount.toFixed(2)}元
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <Checkbox checked={this.state.checked} onChange={()=>this.setState({checked:!this.state.checked})}>我已经阅读并同意<a>《第三方平台商品交易服务协议》</a></Checkbox>
                    </div>
                    <div>
                        <Button className={ordConfSty.payButton} type={'primary'} onClick={this.pay}>
                            小计￥{this.state.payAmount.toFixed(2)}&nbsp;去结算
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
