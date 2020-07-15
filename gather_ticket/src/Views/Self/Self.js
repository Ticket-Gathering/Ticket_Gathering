import React, { Component } from 'react'
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import { Layout, Menu, Breadcrumb, Icon, Radio, DatePicker, Input, Button, Collapse, Table, Divider, Tag, List, Avatar, Result } from 'antd';
import 'antd/dist/antd.css';
import selfstyle from './Self.module.css'
import Axios from '../../Module/Axios'
import moment from 'moment';
const data1 = [
    {
        title: '贺子航 1',
    },
    {
        title: '贺子航 2',
    },
    {
        title: '贺子航 3',
    },
    {
        title: '贺子航 4',
    },
];
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '证件类型',
        dataIndex: 'idType',
        key: 'idType',
    },
    {
        title: '证件号码',
        dataIndex: 'idNum',
        key: 'idNum',
    },
    {
        title: '操作',
        key: 'action',
        render: () => (
            <span>
                <a href="javascript:;">Alter</a>
                <Divider type="vertical" />
                <a href="javascript:;">Delete</a>
            </span>
        ),
    },
];
const columns1 = [
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
const data = [
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
const data2 = [
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
const dateFormat = 'YYYY/MM/DD';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const url = "http://localhost:8080"

export default class Self extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            content: "1",
            client: {
                nickname: ""
            }
        };
        this.changeContent = this.changeContent.bind(this)
        this.logOut = this.logOut.bind(this)

    }
    componentDidMount() {
        Axios.get(url+"/getUserById/"+sessionStorage.getItem("userId")
        ).then(response => {
            console.log(response);
            this.setState({
                client : response.data
            })
        }).catch(function (error) {
            console.log(error);
        });
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    changeContent(e) {
        this.setState({
            content: e.key
        })
    }
    logOut(){
        sessionStorage.setItem("userId", "NULL");
        sessionStorage.setItem("username", "NULL");
        this.props.history.push('/', null);
    }

    SwitchTab(i) {
        switch (i) {
            case "1":
                return <Content style={{ padding: '0 80px', minHeight: 280 }}>
                    <div className={selfstyle.tabBox}>基本资料</div>
                    <div className={selfstyle.line}/>
                    <div>
                        昵称：<Input placeholder="nickname" className={selfstyle.input} style={{marginLeft: '37px'}} value={this.state.client.nickname}/><br />
                        真实姓名：<Input placeholder="Real name" className={selfstyle.input} value={this.state.client.name} /><br />
                        性别： <Radio.Group onChange={this.onChange} value={this.state.client.gender} className={selfstyle.genderSelect}>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group><br />
                        出生日期： <DatePicker style={{width: '300px'}} defaultValue={moment('2019/08/03', dateFormat)} format={dateFormat} className={selfstyle.dateSelect} value={this.state.client.birth}/><br />
                        身份证号：<Input placeholder="Id number" className={selfstyle.input} value={this.state.client.idNum}/><br />
                        <Button type="primary" className={selfstyle.button} style={{backgroundColor: '#ff3366'}}>保存</Button>
                    </div>
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
                    <div className={selfstyle.tabBox}>购票人管理</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <Table columns={columns} dataSource={this.state.client.ticketHolderList} />
                    </div>
                </Content>;
                break;
            case "4":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>地址管理</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.client.receiverList}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.receiver}
                                        description={<div><p>Tel: {item.tel}<br/>Address: {item.address}</p></div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>;
                break;
            case "5":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>订单管理</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <Result
                            icon={<Icon type="smile" theme="twoTone" />}
                            title="您还没有订单哦~"
                            extra={<Button type="primary">Next</Button>}
                        />
                    </div>
                </Content>;
                break;
            case "6":
                return <Content style={{ padding: '0 80px', minHeight: 280 }} className={selfstyle.content}>
                    <div className={selfstyle.tabBox}>我的优惠券</div>
                    <div className={selfstyle.line}/>
                    <div>
                        <Table columns={columns1} dataSource={data2} />
                    </div>
                </Content>;
                break;
        }
    }
    render() {
        return (
            <div>
                <Nav/>
                <div className={selfstyle.format}>
                    <Layout style={{background: '#fff'}}>
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
                                            key="sub1"
                                            title={
                                                <span>
                                                    <Icon type="user" />
                                                    账户中心
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="1" onClick={this.changeContent}>个人信息</Menu.Item>
                                            <Menu.Item key="2" onClick={this.changeContent}>账号设置</Menu.Item>
                                            <Menu.Item key="3" onClick={this.changeContent}>常用购票人</Menu.Item>
                                            <Menu.Item key="4" onClick={this.changeContent}>收货地址</Menu.Item>
                                        </SubMenu>
                                        <SubMenu
                                            key="sub2"
                                            title={
                                                <span>
                                                    <Icon type="laptop" />
                                                    交易中心
                                                </span>
                                            }
                                        >
                                            <Menu.Item key="5" onClick={this.changeContent}>订单管理</Menu.Item>
                                            <Menu.Item key="6" onClick={this.changeContent}>我的优惠券</Menu.Item>
                                        </SubMenu>
                                        <Menu.Item onClick={this.logOut}><Icon type="close" />Log Out</Menu.Item>
                                    </Menu>
                                </Sider>
                                {this.SwitchTab(this.state.content)}
                            </Layout>
                        </Content>
                        <Footer style={{ textAlign: 'center', background: '#fff' }}>You are very welcome</Footer>
                    </Layout>
                </div>
                <Bottom/>
            </div>
        )
    }
}
