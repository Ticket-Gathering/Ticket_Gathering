import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordConfSty from "./OrderConfirm.module.css"
import {Divider,Input,Button,Drawer,Radio,Descriptions,Checkbox,Card} from "antd";
import Axios from '../../Module/Axios';
import {UserOutlined,PhoneOutlined,EnvironmentOutlined,PlusOutlined} from "@ant-design/icons";
const base_url='http://localhost:8080'
const testData={time:'2020.08.02 周日 20:00' ,price:'188',name:'李荣浩2019「年少有为」巡回演唱会',showtime:'2020.08.01-2020.08.02' ,address:'上海市 | 珍珠剧场The Pearl ',ticketType:'电子票',faceValue:'成人票',num:3,img_url:require('../../Assets/images/poster1.jpg'),coupon:24}
export default class OrderConfirm extends Component{
    constructor(props) {
        super(props);
        this.state= {
            watcherValue:[],
            receiverValue:0,
            visible:false,
            data: testData,
            total: 0,
            payAmount: 0,
            buyerName: null,
            buyerPhone: null,
            buyerAddress: null,
            receiverList: [],
            watcherList: [],
            receiver: null,
            watchers: [],
        }
    }
    componentDidMount() {
        this.setState({
            total:parseInt(this.state.data.price)*this.state.data.num,
        },()=>{this.setState({
            payAmount:this.state.total-this.state.data.coupon
        })})
        Axios.get(base_url+'/getUserById/'+4
            // sessionStorage.getItem('userId')
            )
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

    render() {
        console.log(this.state.watcherList)
        const options=[]
        for(let index in this.state.watcherList){
            options.push({label:this.state.watcherList[index].name,value:index})
        }
        return (
            <div>
                <SimpleNav/>
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
                                                <Card title={`观影者${index+1}号`}>
                                                    <div className={ordConfSty.cardContent}>
                                                        <span>观影人姓名：{info.name}</span>
                                                        <span>证件类型：&nbsp;{info.idType=='ID-card'?'身份证':'护照'}</span>
                                                        <span>证件号码：&nbsp;{info.idNum}</span>
                                                    </div>
                                                </Card>
                                            </div>
                                        )
                                    })
                                }
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
            </div>
        );
    }
}
