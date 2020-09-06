import React, { Component } from 'react';
import abouti from "./AuctionItem.module.css";
import Sign from "./Sign";
import { Statistic, Row, Col } from 'antd';
import { Divider ,Button} from 'antd';
import { InputNumber, Tag } from 'element-react';
import Axios from "../../Module/Axios";
import {url} from "../../Constants/constants";
import Cookies from "js-cookie"
import ErrorPage from "../Error/ErrorPage";


const { Countdown } = Statistic;

export default class AuctionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: null,
            nowprice: null,
            image:null,
            step: null,
            ifcheck: 0,
            start_time:null,
            end_time:null,
            start_price:null,
            deadline:null,

        }
        this.cadd = this.cadd.bind(this);
        this.cmil = this.cmil.bind(this);
    };

    componentDidMount() {
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
            this.setState({
                count:obj.highest_price,
                nowprice:obj.highest_price,
                highest_user_id:obj.highest_user_id
            })
        }.bind(this)

    }

    componentWillReceiveProps(nextProps,nextContext){
        var date = new Date(nextProps.aboutitem.end_time);
        this.setState({
            nowprice:nextProps.aboutitem.highest_Price,
            count:nextProps.aboutitem.highest_Price,
            start_time:nextProps.aboutitem.start_time,
            end_time:nextProps.aboutitem.end_time,
            step:nextProps.aboutitem.step_price,
            start_price:nextProps.aboutitem.start_price,
            image:nextProps.aboutitem.showDetail.show.img_url,
            deadline:date,
            aucid:nextProps.aucid,
        })
        let data = new FormData();
        if(Cookies.get("userId")!=null){
            data.append("aucid",nextProps.aucid);
            data.append("userid",Cookies.get("userId"));}

        Axios.post(url+"/auction/check", data
        ).then((res) => {
            if(res.data.status===0){
                this.setState({
                    ifcheck:1
                })}
        }).catch(err => {
            console.log(err);
        })
    };

    cmil=()=> {
        let n = this.state.count;
        let m = this.state.nowprice;
        let b = this.state.step;
        if (n > m) {
            n-=b;
            this.setState({
                count: n
            })
        } else {
            return;
        }

    }

    cadd=()=> {
        console.log("+");
        let a = this.state.count;
        let b = this.state.step;
        a = a+b;
        this.setState({
                count: a
            })
    }

    sum() {
        let e = this.state.num;
        let n = this.state.count;
        return e * n;
    }

    pay = () => {
        let data = new FormData();
        data.append("aucid",this.state.aucid);
        data.append("userid",Cookies.get("userId"));

        Axios.post(url+"/auction/addNewRecord", data
        ).then((res) => {
            if(res.data!=null){
                console.log(res.data);
                this.setState({
                    ifcheck:1
                })}
        }).catch(err => {
            console.log(err);
        })
    };

    bid =()=> {
        let data = new FormData();
        var date = new Date();
        var str = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString()+" "+date.getHours().toString()+":"+date.getMinutes().toString()+":"+date.getMinutes().toString();
        console.log(str);
        if(Cookies.get("userId")!=null){
            data.append("aucid",this.state.aucid);
            data.append("userid",Cookies.get("userId"))};
            data.append("price",this.state.count);
            data.append("record_time",str)

        Axios.post(url+"/auction/updatePrice", data
        ).then((res) => {
            if(res.data.status===0){
                this.setState({
                    ifcheck:1
                })}
        }).catch(err => {
            console.log(err);
        })
    }

    change=(e)=>{
        this.setState({
            count:e
        });
    }

    renderButton = () =>  {
        if (!this.state.ifcheck) {
            return(
                <Button className={abouti.sub} disabled>出价</Button>
            );
        }
        return (
            <Button className={abouti.sub} onClick={()=>this.bid()}>出价</Button>
        );
    };

    renderButton2=()=>{
        if (!this.state.ifcheck) {
            return(
                <Button className={abouti.sub} onClick={this.pay}>报名交保证金</Button>
            );
        }
        return (
            <Button className={abouti.sub} disabled>报名交保证金</Button>
        );
    }

    renderRemind = () =>  {
        if (!this.state.ifcheck) {
            return(
                <div style={{color: "#999"}}>
                    <img className={abouti.chuizi} src={require('./提醒.png')} />
                    提醒：请先报名交保证金再出价。
                </div>
            );
        }
        return null;
    };

    render() {
        return (
            <div className={abouti.format}>
                <div className={abouti.abouti}>
                    <div className={abouti.left}>
                        <div className={abouti.righttop}>【杭州】「初夏人生」嘻哈派对</div>
                        <div className={abouti.leftt}>
                            <img className={abouti.leftti} src={this.state.image} />
                            <div className={abouti.leftts}>
                                <Sign/>
                            </div>
                        </div>
                    </div>

                    <div className={abouti.right}>
                        <div className={abouti.rightbtime}>
                            <Row gutter={24}>
                                <Col span={24} style={{ marginTop: 32 }}>
                                    <Countdown title="拍卖倒计时" value={this.state.deadline} format="D 天 H 时 m 分 s 秒" />
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: 40}}>
                                <Col span={24} style={{ marginTop: 32, color: "#999" }} >
                                    设置提醒
                                </Col>
                                <Col>
                                    <img className={abouti.clock} src={require('./闹钟.png')}/>
                                </Col>
                            </Row>

                        </div>
                        <div className={abouti.rightbtime}>
                            <div className={abouti.rightbtimel}>当前价</div>
                            <div className={abouti.sum}>
                                ￥{this.state.nowprice}
                            </div>
                            <Tag style={{backgroundColor:"#f36", color:"white"}}>出价人:{this.state.highest_user_id}</Tag>
                        </div>
                        <div className={abouti.rightInfo}>
                            <div className={abouti.rightbtimel}>出价</div>
                            <div className={abouti.rightbtimer}>
                                <InputNumber defaultValue={this.state.nowprice} step={this.state.step} min={this.state.nowprice}  onChange={(value)=>this.change(value)}/>
                            </div>
                        </div>
                        <div className={abouti.rightInfo}>
                            {this.renderButton2()}
                        </div>
                        <div className={abouti.rightInfo}>
                            {this.renderButton()}
                        </div>
                        <div className={abouti.rightbtime}>
                            {this.renderRemind()}
                        </div>
                        <Divider />
                        <div className={abouti.rightbtime}>
                            <img className={abouti.chuizi} src={require('./锤子.png')}/>
                            <div>大麦拍卖</div>
                            <Divider type="vertical" className={abouti.vertDiv} />
                            <div>当前 18 人 报名</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div>起拍价: {this.state.start_price} 元</div>
                            <Divider type="vertical" className={abouti.vertDiv}/>
                            <div>加价幅度： {this.state.step} 元</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div>保证金: 200 元</div>
                            <Divider type="vertical" className={abouti.vertDiv} />
                            <div>竞价周期： 3 天</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div>评估价: 1200 元</div>
                            <Divider type="vertical" className={abouti.vertDiv} />
                            <div>延时周期： 5 分钟</div>
                        </div>
                        <div style={{textAlign: "left", color:"#999"}}>
                            <div>竞价规则： 至少一人报名且出价不低于起拍价，方可成交 </div>
                            <div>尾款支付方式： 查看竞买公告中的说明  </div>
                            <div>尾款线上支付截止： 按竞买公告中的截止时间及时支付 </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

