import React, { Component } from 'react';
import abouti from "./auctionItem.module.css";
import Sign from "./Sign";
import { Statistic, Row, Col } from 'antd';
import { Divider ,Button} from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60;

function onFinish() {
    console.log('finished!');
}

export default class auctionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1000,     //出价
            nowprice:1000,   //当前拍卖价
            step: 10,        //加价幅度
            ifcheck:0,       //当前用户是否交了保证金
        }
        this.cadd = this.cadd.bind(this);
        this.cmil = this.cmil.bind(this);
    }

    cmil() {
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

    cadd() {
        let a = this.state.count;
        let b = this.state.step;
        a += b;
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
        console.log('test');
        this.setState({ifcheck:1})
    }

    bid = (e) => {
        this.setState({nowprice:e})
    }

    renderButtton = () =>  {
        if (!this.state.ifcheck) {
            return(
                <Button className={abouti.sub} disabled>出价</Button>
            );
        }
        return (
            <Button className={abouti.sub} onClick={this.bid(1010)}>出价</Button>
        );
    };

    renderRemind = () =>  {
        if (!this.state.ifcheck) {
            return(
                <div>
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
                            <img className={abouti.leftti} src={require('./try1.webp')} />
                            <div className={abouti.leftts}>
                                <Sign/>
                            </div>
                        </div>
                    </div>

                    <div className={abouti.right}>
                        <div className={abouti.rightbtime}>
                            <Row gutter={24}>
                                <Col span={24} style={{ marginTop: 32 }}>
                                    <Countdown title="拍卖倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: 10}}>
                                <Col span={24} style={{ marginTop: 32 }} >
                                    设置提醒
                                </Col>
                                <Col>
                                    <img className={abouti.clock} src={require('./闹钟.png')}></img>
                                </Col>
                            </Row>

                        </div>
                        <div className={abouti.rightbtime}>
                            <div className={abouti.rightbtimel}>当前价</div>
                            <div className={abouti.sum}>
                                ￥1000
                            </div>
                            <div className={abouti.rightbremindl}>出价人:cjx12138</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div className={abouti.rightbtimel}>出价</div>
                            <div className={abouti.rightbtimer}>
                                <div className={abouti.rightnumber}>
                                    <div className={this.state.count <= 1000 ? abouti.rightnumberolim : abouti.rightnumbero} onClick={this.cmil}>-</div>
                                    <div className={abouti.rightnumberi}>{this.state.count}</div>
                                    <div className={abouti.rightnumbero} onClick={this.cadd}>+</div>
                                </div >
                            </div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <Button className={abouti.sub} onClick={this.pay}>报名交保证金</Button>
                            {this.renderButtton()}
                        </div>
                        <div className={abouti.rightbtime}>
                            {this.renderRemind()}
                        </div>
                        <Divider />
                        <div className={abouti.rightbtime}>
                            <img className={abouti.chuizi} src={require('./锤子.png')}></img>
                            <div>大麦拍卖</div>
                            <Divider type="vertical" />
                            <div>当前 18 人 报名</div>
                            <Divider type="vertical" />
                            <div> 717 人 设置提醒</div>
                            <Divider type="vertical" />
                            <div> 25399 次 围观</div>
                        </div>
                        <Divider />
                        <div className={abouti.rightbtime}>
                            <div>起拍价: 1000 元</div>
                            <Divider type="vertical" />
                            <div>加价幅度： 10 元</div>
                            <Divider type="vertical" />
                            <div>类 型： 拍卖</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div>保证金: 200 元</div>
                            <Divider type="vertical" />
                            <div>竞价周期： 3 天</div>
                            <Divider type="vertical" />
                            <div>优先购买权人： 无</div>
                        </div>
                        <div className={abouti.rightbtime}>
                            <div>评估价: 1200 元</div>
                            <Divider type="vertical" />
                            <div>延时周期： 5 分钟</div>
                        </div>
                        <div>竞价规则： 至少一人报名且出价不低于起拍价，方可成交 </div>
                        <div>尾款支付方式： 查看竞买公告中的说明  </div>
                        <div>尾款线上支付截止： 按竞买公告中的截止时间及时支付 </div>
                        <Divider type="vertical" />
                    </div>
                </div>
            </div>

        )
    }
}

