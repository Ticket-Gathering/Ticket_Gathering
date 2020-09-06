import React, { Component } from 'react'
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import { Layout, Menu, Breadcrumb, Radio, DatePicker, Input, Button, Collapse, Table, Divider, Tag, List, Avatar, Result, Form } from 'antd';
import 'antd/dist/antd.css';
import selfstyle from './Self.module.css'
import Axios from '../../Module/Axios'
import moment from 'moment';
import axios from 'axios'
import {SmileTwoTone,UserOutlined,LaptopOutlined,SettingOutlined,CloseOutlined} from "@ant-design/icons";
import {Message} from "element-react"
import ShowManage from "./ShowManage";
import Cookies from 'js-cookie'
import {identityCheck} from "../../Tool/smallTools";
import {EditableTable} from "../../Components/EditableTable";
import {url} from "../../Constants/constants"
import {Link} from "react-router-dom";

const receiverColumns=[
    {
        title:'姓名',
        dataIndex:'receiver',
        key:'receiver',
        width: '25%',
        editable: true,
    },
    {
        title:'电话号码',
        dataIndex:'tel',
        key:'tel',
        width: '15%',
        editable: true,
    },
    {
        title:'地址',
        dataIndex:'address',
        key:'address',
        width: '40%',
        editable: true,
    }
]
const ticketHolderColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        editable: true,
    },
    {
        title: '证件类型',
        dataIndex: 'idType',
        key: 'idType',
        width: '15%',
        editable: true,
    },
    {
        title: '证件号码',
        dataIndex: 'idNum',
        key: 'idNum',
        width: '40%',
        editable: true,
    },
];
const couponColumns = [
    {
        title: '优惠券号码',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '名称',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '优惠说明',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '使用条件',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="javascript:;">Invite {record.name}</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        ),
    },
];
const couponData = [
    {
        key: '1',
        name: '贺子航',
        age: 23,
        address: '四川省乐山',
        tags: ['家', '哈哈'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const { Panel } = Collapse;
const dateFormat = 'YYYY-MM-DD';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

export default class Self extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing:false,
            value: 1,
            content: "1",
            client: {
                nickname: "",
                name: "",
                gender: 1,
                birth: null,
                idNum:null,
                tel:null,
            },
            userList:[],
            isLogged: false,
            loadSuccess:false,
            orderList:[{},{},{},{},{},{},{},{},{},{}],
        };
        this.changeContent = this.changeContent.bind(this)
        this.logOut = this.logOut.bind(this)
        this.showAllUsers = this.showAllUsers.bind(this)
        this.blockUser = this.blockUser.bind(this)
        this.unblockUser = this.unblockUser.bind(this)
    }
    componentDidMount() {

        if(Cookies.get('userId') !== 'NULL' && Cookies.get('userId') !== null){
            this.setState({
                isLogged: true
            })
        } else {
            this.setState({
                isLogged: false
            })
            return;
        }
        Axios.get(url+"/getUserById/"+Cookies.get("userId")
        ).then(response => {
            console.log(response);
            for(let item of response.data.ticketHolderList){
                item.key=item.ticketHolderId
            }
            for(let item of response.data.receiverList){
                item.key=item.receiverId
            }
            this.setState({
                client : response.data,
            },()=>{this.setState({
                    loadSuccess:true
                })
            })
        }).catch(function (error) {
            console.log(error);
        });

        var websocket = null;
        if ('WebSocket' in window) {
            websocket = new WebSocket('ws://localhost:8080/webSocket');
        } else {
            alert('该浏览器不支持websocket!');
        }
        websocket.onopen = function (event) {
            // console.log('建立连接');
        }
        websocket.onclose = function (event) {
            // console.log('连接关闭');
        }
        websocket.onmessage = function (event) {
            console.log(JSON.parse(event.data));
            var obj = JSON.parse(event.data);

            alert(obj.highest_price);

            this.setState({
                count:obj.highest_price,
                nowprice:obj.highest_price,
                highest_user_id:obj.highest_user_id
            })
        }.bind(this)
    }
    onChange(key, e){
        let value = e.target.value;
        let tmpForm = this.state.client;
        tmpForm[key] = value;
        this.setState({
            client: tmpForm,
        })
    }
    changeContent(e) {
        this.setState({
            content: e.key
        })
    }
    logOut(){
        Cookies.set("userId", "NULL");
        Cookies.set("username", "NULL");
        this.props.history.push('/', null);
    }
    showAllUsers(){
        Axios.get(url+"/admin/getAllUsers")
            .then(response => {

                console.log(JSON.parse(JSON.stringify(response.data)))
                this.setState({
                    userList : response.data
                })
                this.changeContent({key:"7"});
            }).catch(function (error) {
            console.log(error);
        });
    }
    updateUser=(values)=>{
        this.setState({
            isEditing:!this.state.isEditing
        },()=>{
            //说明之前为true处于编辑状态
            console.log(values)
            if(!this.state.isEditing){

                values.birth=values.birth.format(dateFormat)
                console.log(values)
                values.userId=Cookies.get('userId')
                axios.post(url+'/updateUserDetail',JSON.stringify(values),{headers:{'Content-Type':'application/json'}})
                    .then(
                    (response)=>{
                        console.log(response.data)
                    }
                )
            }
        })
    }
    editUser(){
        this.setState({
            isEditing: true
        })
    }
    ditchEdition(){
        this.setState({
            isEditing:false
        })
    }

    blockUser(idx){
        Axios.get(url+"/admin/blockUser/"+this.state.userList[idx].userId)
            .then(response => {
                if(response.data.status === 0){
                    Message({
                        message: response.data.msg,
                        type: "success"
                    });
                    let tmpList = this.state.userList;
                    tmpList[idx].userType = 2;
                    this.setState({
                        userList: tmpList
                    })
                }
            }).then(() => {
                let data = new FormData();
                data.append("adminId", Cookies.get("userId"));
                data.append("operation", "Block user with id:"+this.state.userList[idx].userId)
                Axios.post(url+"/admin/logOperation", data)
                    .then(response => {
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            }
        ).catch(function (error) {
            console.log(error);
        });
    }
    unblockUser(idx){
        Axios.get(url+"/admin/unblockUser/"+this.state.userList[idx].userId)
            .then(response => {
                if(response.data.status === 0){
                    Message({
                        message: response.data.msg,
                        type: "success"
                    });
                    let tmpList = this.state.userList;
                    tmpList[idx].userType = 1;
                    this.setState({
                        userList: tmpList
                    })
                }
            }).then(() => {
                let data = new FormData();
                data.append("adminId", Cookies.get("userId"));
                data.append("operation", "Unblock user with id:"+this.state.userList[idx].userId)
                Axios.post(url+"/admin/logOperation", data)
                    .then(response => {
                        console.log(response)
                    }).catch(function (error) {
                    console.log(error);
                });
            }
        ).catch(function (error) {
            console.log(error);
        });
    }
    getOrderList(){
        let data = new FormData();
        data.append("username", Cookies.get("username"));
        Axios.post(url+"/getIndentByUser", data)
            .then(response => {
                // console.log(typeof(response.data[0].selected_time));
                this.setState({
                    orderList: response.data,
                })
                this.changeContent({key: "5"})
            }).catch(function (error) {
            console.log(error);
        });
    }
    goAbout(record){
        let i = record.showid;
        let p = record.platform;
        this.props.history.push({ pathname: "/about" + `/${i}` + `/${p}`})
    }

    SwitchTab(i) {
        switch (i) {
            case "1":
                const formItemLayout = {
                    labelCol: { span: 3 },
                    wrapperCol: { span: 6 },
                };
                return <Content style={{ padding: '0 80px', minHeight: 280 }}>
                    <div className={selfstyle.tabBox}>基本资料</div>
                    <div className={selfstyle.line}/>
                    <Form
                        onFinish={(values)=>this.updateUser(values)}
                        className={selfstyle.form}
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 10 }}
                        initialValues={{
                            'nickname':this.state.client.nickname,
                            'name':this.state.client.name,
                            'gender':this.state.client.gender,
                            'IdNum':this.state.client.idNum,
                            'tel':this.state.client.tel,
                            'email':this.state.client.email,
                            'birth':this.state.client.birth? moment(this.state.client.birth, dateFormat): moment('1970/01/01', dateFormat)
                        }}

                    >
                        <Form.Item label={'昵称'} name={'nickname'}>
                            <Input disabled={!this.state.isEditing} placeholder="请输入你的用户昵称" className={selfstyle.input} />
                        </Form.Item>
                        <Form.Item label={'真实姓名'} name={'name'}>
                            <Input disabled={!this.state.isEditing} placeholder="请输入你的真实姓名" className={selfstyle.input}/>
                        </Form.Item>
                        <Form.Item label={'性别'} name={'gender'} >
                            <Radio.Group disabled={!this.state.isEditing}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'身份证号'} name={'IdNum'}
                                   hasFeedback
                            rules={[{validator:(rules,val,cb)=>identityCheck(rules,val,cb)}]}
                        >
                            <Input disabled={!this.state.isEditing} placeholder="请输入你相应的证件号码" className={selfstyle.input}/>
                        </Form.Item>
                        <Form.Item label={'出生日期'} name={'birth'}>
                            <DatePicker
                                disabled={!this.state.isEditing}
                                style={{width: '300px'}}
                                format={dateFormat}
                                className={selfstyle.datePicker}/>
                        </Form.Item>
                        <Form.Item hasFeedback label={'电话号码'} name={'tel'} rules={[{len:11,message:'The input is not valid telephone Number!'}]}>
                            <Input  disabled={!this.state.isEditing} placeholder="Tel number" className={selfstyle.input} />
                        </Form.Item>
                        <Form.Item hasFeedback label={'邮箱地址'} name={'email'} rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                        ]}>
                            <Input  disabled={!this.state.isEditing} placeholder="请输入你的电子邮箱" className={selfstyle.input}/>
                        </Form.Item>
                        <Form.Item label={" "} colon={false}>
                            {this.state.isEditing?
                                <div><Button
                                    type="primary"
                                    htmlType="submit"
                                    className={selfstyle.button}
                                    style={{backgroundColor: '#ff3366', marginRight:"20px"}}
                                >
                                    保存
                                </Button>
                                <Button
                                    danger
                                    onClick={this.ditchEdition.bind(this)}
                                >
                                    取消
                                </Button></div>:
                                <Button
                                    className={selfstyle.button}
                                    style={this.state.isEditing?{backgroundColor: '#ff3366'}:{backgroundColor: '#0088D6'}}
                                    onClick={this.editUser.bind(this)}
                                >
                                    编辑
                                </Button>}
                        </Form.Item>
                    </Form>
                </Content>;
                break;
            case "2":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>账号设置</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <Collapse accordion>
                            <Panel header="登录密码" key="1">
                                <p>您可以登录修改密码</p>
                            </Panel>
                            <Panel header="邮箱验证" key="2">
                                <p>验证邮箱可帮助您快速找回密码，并可接收订单、演出通知、促销活动等提醒立即绑</p>
                            </Panel>
                            <Panel header="手机验证" key="3">
                                <p>认证您的实名信息，提高安全等级</p>
                            </Panel>
                        </Collapse>,
                    </div>
                </Content>;
                break;
            case "3":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>观影人管理</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <EditableTable
                            columns={ticketHolderColumns}
                            dataSource={this.state.client.ticketHolderList}
                            TableName={'ticketHolder'}
                            updateUrl={'/updateTicketHolder'}
                            deleteUrl={'/deleteTicketHolder'}
                        />
                    </div>
                </Content>;
                break;
            case "4":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>地址管理</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <EditableTable
                            columns={receiverColumns}
                            dataSource={this.state.client.receiverList}
                            TableName={'receiver'}
                            updateUrl={'/updateReceiver'}
                            deleteUrl={'/deleteReceiver'}
                        />
                    </div>
                </Content>;
                break;
            case "5":
                const columns = [
                    { title: '演出ID', dataIndex: 'showid', key: 'showid',
                        render: (value, record) => {
                            return <a onClick={() => this.goAbout(record)}>{value}</a>
                        }},
                    { title: '演出时间', dataIndex: 'selected_time', key: 'selected_time' },
                    { title: '平台', dataIndex: 'platform', key: 'platform' },
                    { title: '总价', dataIndex: 'payamount', key: 'payamount' },
                    { title: '数量', dataIndex: 'num', key: 'num' },
                    { title: '订单状态', dataIndex: 'order_status', key: 'order_status',
                        render: (value) => {
                            switch (value){
                                case 1:
                                    return <Tag color="#f50">未支付</Tag>;
                                case 2:
                                    return <Tag color="#87d068">已支付</Tag>;
                                case 3:
                                    return <Tag color="default">已取消</Tag>;
                                case 4:
                                    return <Tag color="default">已超时</Tag>;
                            }
                        }
                    },
                ]
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>订单管理</div>
                    <div className={selfstyle.line}/>
                    <div style={{height: '600px'}}>
                        {this.state.orderList.length === 0?
                            <Result
                                icon={<SmileTwoTone />}
                                title="您还没有订单哦~"
                                extra={<Button type="primary">Next</Button>}
                            />:
                            <div>
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    expandable={{
                                        expandedRowRender: record => <div>
                                            <p style={{ margin: 0 }}>Receiver: {record.receiver_name}</p>
                                            <p style={{ margin: 0 }}>Tel: {record.receiver_tel}</p>
                                            <p style={{ margin: 0 }}>Address: {record.receiver_address}</p>
                                        </div>,
                                    }}
                                    dataSource={this.state.orderList}
                                />
                            </div>
                        }

                    </div>
                </Content>;
                break;
            case "6":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>我的优惠券</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <Table columns={couponColumns} dataSource={couponData} />
                    </div>
                </Content>;
                break;
            case "7":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>用户管理</div>
                    <div className={selfstyle.line}/>
                    <div style={{height: "300px"}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.userList}
                            colunm="10"
                            renderItem={(item,index) => (
                                <List.Item
                                    data-cy={'user:'+item.username}
                                    actions={[item.userType === 1? (<Button type="primary" className={selfstyle.button} style={{backgroundColor: 'red'}} onClick={() => this.blockUser(index)} data-cy={'disable'}>禁用</Button>)
                                        :(<Button type="primary" className={selfstyle.button} style={{backgroundColor: 'green'}} onClick={() => this.unblockUser(index)} data-cy={'enable'}>解禁</Button>)]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<span style={{fontSize: "20px"}}>{item.username}</span>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>;
                break;
            case "8":
                return <ShowManage/>
        }
    }
    render() {
        // console.log(Cookies.getJSON('userId'))
        // console.log(Cookies.getJSON('username'))
        //if(!this.state.loadSuccess)return <div>loading</div>
        // else
        return (
            <div>
                <Nav/>
                    <div className={selfstyle.format}>
                    {this.state.loadSuccess
                        ?
                            (<Layout style={{background: '#fff'}}>
                                <Content style={{ padding: '0 50px' }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                                        <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                                        <Sider width={200} style={{ background: '#fff' }}>
                                            <Menu
                                                mode="inline"
                                                defaultSelectedKeys={['1']}
                                                defaultOpenKeys={['sub1']}
                                                style={{ height: '100%' }}
                                            >
                                                <SubMenu
                                                    data-cy={'账户中心'}
                                                    key="sub1"
                                                    title={<span><UserOutlined/>账户中心</span>}
                                                >
                                                    <Menu.Item key="1" onClick={this.changeContent} data-cy={'个人信息'}>个人信息</Menu.Item>
                                                    <Menu.Item key="2" onClick={this.changeContent} data-cy={'账号设置'}>账号设置</Menu.Item>
                                                    <Menu.Item key="3" onClick={this.changeContent} data-cy={'常用观影人'}>常用观影人</Menu.Item>
                                                    <Menu.Item key="4" onClick={this.changeContent} data-cy={'收货地址'}>收货地址</Menu.Item>
                                                </SubMenu>
                                                <SubMenu key="sub2" title={<span><LaptopOutlined/>交易中心</span>} data-cy={'交易中心'}>
                                                <Menu.Item key="5" onClick={this.getOrderList} data-cy={'订单管理'}>订单管理</Menu.Item>
                                                <Menu.Item key="6" onClick={this.changeContent} data-cy={'我的优惠券'}>我的优惠券</Menu.Item>
                                                </SubMenu>
                                            {(Cookies.get("userType") === "0") ?
                                                (<SubMenu
                                                    key="sub3"
                                                    title={
                                                        <span>
                                                            <SettingOutlined/>
                                                            网站管理
                                                        </span>}
                                                    data-cy={'网站管理'}
                                                >
                                                    <Menu.Item key="7" onClick={this.showAllUsers} data-cy={'用户管理'}>用户管理</Menu.Item>
                                                    <Menu.Item key="8" onClick={this.changeContent} data-cy={'演出管理'}>演出管理</Menu.Item>
                                                </SubMenu>) :
                                                (<div/>)
                                            }
                                            <Menu.Item onClick={this.logOut} data-cy={'logout'}><CloseOutlined/>Log Out</Menu.Item>
                                        </Menu>
                                    </Sider>
                                    {this.SwitchTab(this.state.content)}
                                </Layout>
                            </Content>
                            <Footer style={{ textAlign: 'center', background: '#fff' }}>You are very welcome</Footer>
                        </Layout>)
                    : (<Result className={selfstyle.noResult} icon={<SmileTwoTone />} title="您还没有登录，请登录后再操作。"/>)}
                    </div>
                <Bottom/>
            </div>
        )
    }
}
