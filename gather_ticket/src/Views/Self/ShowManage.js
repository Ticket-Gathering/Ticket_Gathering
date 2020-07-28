import React, { Component } from 'react'
import manageStyle from './ShowManage.module.css'
import Axios from '../../Module/Axios'
import selfstyle from "./Self.module.css";
import {Layout, Button} from "antd";
import {Form, Input, Radio, Checkbox, Switch, Tag} from "element-react"

const url = "http://localhost:8080/admin"
const { Content } = Layout;

export default class ShowManage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                name: null,
                category: 0,
                subcategory: 0,
                artists: null,
                showTime: null,
                city: "",
                venue: "",
                isEticket: false,
                isXuanzuo: false,
                ticketPrice: [],
                priceHigh: 0,
                priceLow: 0,
                platform: "",
                poster: "",
                info:"",
            },
            tagValue:""
        };
    }
    onSubmit() {
        console.log(this.state.form)
    }
    onChange(key, value){
        let tmpForm = this.state.form;
        tmpForm[key] = value;
        this.setState({
            form: tmpForm,
        })
    }
    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.handleInputConfirm();
        }
    }
    inputNewTag(value) {
        this.setState({
            tagValue: value
        });
    }

    handleClose(index) {
        let tmpForm = this.state.form;
        tmpForm.ticketPrice.splice(index, 1);
        this.setState({
            form: tmpForm
        })
    }

    showInput() {
        this.setState({ inputVisible: true }, () => {
            this.refs.saveTagInput.focus();
        });
    }

    handleInputConfirm() {
        let tmpForm = this.state.form;
        if (this.state.tagValue) {
            tmpForm.ticketPrice.push(this.state.tagValue);
            this.setState({
                form: tmpForm,
                inputVisible : false,
                tagValue: ''
            })
        }
    }

    cancel(){
        this.setState({
            form:{
                name: null,
                category: 0,
                subcategory: 0,
                artists: null,
                showTime: null,
                city: "",
                venue: "",
                isEticket: false,
                isXuanzuo: false,
                ticketPrice: [],
                priceHigh: 0,
                priceLow: 0,
                platform: "",
                poster: "",
                info:"",
            },
            tagValue:""
        })
    }

    render() {
        return (
            <Content style={{ padding: '0 80px', minHeight: 280 }} className={manageStyle.content}>
                <div className={manageStyle.tabBox}>添加演出</div>
                <div className={manageStyle.line}/>
                <div style={{marginTop: '20px'}}>
                    <Form model={this.state.form} labelWidth="100" >
                        <Form.Item label="演出名称">
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}/>
                        </Form.Item>
                        <Form.Item label="艺人名单">
                            <Input value={this.state.form.artists} onChange={this.onChange.bind(this, 'artists')}/>
                        </Form.Item>
                        <Form.Item label="演出城市">
                            <Input value={this.state.form.city} onChange={this.onChange.bind(this, 'city')}/>
                        </Form.Item>
                        <Form.Item label="演出场馆">
                            <Input value={this.state.form.venue} onChange={this.onChange.bind(this, 'venue')}/>
                        </Form.Item>
                        <Form.Item label="演出时间">
                            <Input value={this.state.form.showTime} onChange={this.onChange.bind(this, 'showTime')}/>
                        </Form.Item>
                        <Form.Item label="演出票档">
                            <div className={manageStyle.ticketTag}>
                                {
                                    this.state.form.ticketPrice.map((tag, index) => {
                                        return (
                                            <Tag
                                                key={Math.random()}
                                                closable={true}
                                                closeTransition={false}
                                                onClose={this.handleClose.bind(this, index)}
                                                >￥{tag}</Tag>
                                        )
                                    })
                                }
                            </div>
                            <div className={manageStyle.ticketInput}>{
                                this.state.inputVisible ? (
                                    <Input
                                        value={this.state.tagValue}
                                        ref="saveTagInput"
                                        onChange={this.inputNewTag.bind(this)}
                                        onKeyUp={this.onKeyUp.bind(this)}
                                        onBlur={this.handleInputConfirm.bind(this)}
                                    />
                                    ) : <Button onClick={this.showInput.bind(this)} type={"danger"} plain={"true"}>+ New Ticket</Button>
                            }
                            </div>
                        </Form.Item>
                        <Form.Item label="演出属性" >
                            <Switch
                                onText="电子票"
                                offText="纸质票"
                                onValue={1}
                                offValue={0}
                                width={80}
                                className={manageStyle.attr}
                                value={this.state.form.isEticket}
                                onChange={this.onChange.bind(this, 'isEticket')}
                            />
                            <Switch
                                onText="可选座"
                                offText="不可选座"
                                width={90}
                                onValue={1}
                                offValue={0}
                                className={manageStyle.attr}
                                value={this.state.form.isXuanzuo}
                                onChange={this.onChange.bind(this, 'isXuanzuo')}
                            />
                        </Form.Item>
                        <Form.Item label="演出类别">
                            <Radio.Group value={this.state.form.category} onChange={this.onChange.bind(this, 'category')} max={1}>
                                <Radio value="0" name="type">儿童亲子</Radio>
                                <Radio value="1" name="type">演唱会</Radio>
                                <Radio value="2" name="type">音乐会</Radio>
                                <Radio value="3" name="type">话剧歌剧</Radio>
                                <Radio value="4" name="type">舞蹈芭蕾</Radio>
                                <Radio value="5" name="type">曲苑杂坛</Radio>
                                <Radio value="6" name="type">体育赛事</Radio>
                                <Radio value="7" name="type">展览休闲</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="票源平台">
                            <Radio.Group value={this.state.form.platform} onChange={this.onChange.bind(this, 'platform')}>
                                <Radio value="大麦网"/>
                                <Radio value="摩天轮"/>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="项目详情">
                            <Input type="textarea" value={this.state.form.info} onChange={this.onChange.bind(this, 'info')}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" className={manageStyle.button} onClick={this.onSubmit.bind(this)} style={{backgroundColor: '#ff3366', marginRight: "10px"}}>发布演出</Button>
                            <Button onClick={this.cancel.bind(this)} className={manageStyle.cancelBtn}>取消</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        );
    }
}