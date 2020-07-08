import React, { Component } from 'react';
import abouti from "./auctionItem.module.css";
import Sign from "./Sign";
import { Statistic, Row, Col } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 30; // Moment is also OK
function onFinish() {
    console.log('finished!');
}
export default class auctionItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1000,
            nowprice:1000,
            step: 10,
            num: 0,
            pricelist: [],
            timelist: []
        }
        this.cadd = this.cadd.bind(this);
        this.cmil = this.cmil.bind(this)
    }

    isShop(i) {                //判断是否为预售票
        let n = Date.now().valueOf();
        let m = new Date(i).valueOf();
        if (n < m) {
            return <div className={abouti.rightremind}>
                <div className={abouti.rightremindl}>预售|</div>
                <div className={abouti.rightremindr}>
                    <div className={abouti.rightremindrt}>
                        本商品为预售商品，正式开票后将在第一时间为您配送
                            </div>
                    <div className={abouti.rightremindrb}>
                        预售期间，由于主办未正式开票，下单后无法立即配送票品。一般演出前2-6周出票，待正式开票后将在第一时间为您配送，请耐心等待。纸质票购票后可在订单详情页查看物流信息
                            </div>
                </div>
            </div>
        }
    }

    cTime(e) {
        let n = this.state.timelist;
        for (let a = 0; a < n.length; a++) {
            n[a] = 0;
        }
        n[e] = 1;
        this.setState({
            timelist: n
        })
        n = "";
    }

    cPrice(e) {
        let n = this.state.pricelist;
        let m = 0;
        for (let a = 0; a < n.length; a++) {
            n[a].state = 0;
        }
        n[e].state = 1;
        m = n[e].price;
        this.setState({
            pricelist: n,
            num: m
        })
        n = "";
        m = "";
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
    
  

    render() {
        return (
            <div className={abouti.abouti}>
                <div className={abouti.left}>
                    <div className={abouti.leftt}>
                        <img className={abouti.leftti} src={this.props.aboutitem.imgurl} />
                        <div className={abouti.leftts}>
                            <Sign></Sign>
                        </div>

                    </div>
                </div>

                <div className={abouti.right}>
                    <Row gutter={16}>
                        <Col span={24} style={{ marginTop: 32 }}>
                            <Countdown title="拍卖倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
                        </Col>
                    </Row>
                    <div className={abouti.righttop}>{this.props.aboutitem.name}</div>

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

                    <div className={abouti.sub}>
                        报名交保证金
                    </div>
                    <div className={abouti.sub}>
                        立即购买
                    </div>


                </div>
            </div>
        )
    }
}

