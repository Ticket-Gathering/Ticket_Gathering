import React, { Component } from 'react';
import abouti from "./AboutItem.module.css";
import Sign from "./Sign";
import {Divider} from "antd";
import {InputNumber} from "element-react"

export default class AboutItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            num: 0,
            priceList: [],
            timeList: []
        };
    }

    isPreSale(i) {                //判断是否为预售票
        let n = Date.now().valueOf();
        let m = new Date(i).valueOf();
        // if (n < m) {
            return <div className={abouti.preSaleBox}>
                <div className={abouti.preSale}>预售</div>
                <Divider type={'vertical'} style={{height: '100px'}}/>
                <div className={abouti.preSaleInfo}>
                    <div>
                        本商品为预售商品，正式开票后将在第一时间为您配送
                    </div>
                    <div style={{color:'gray'}}>
                        预售期间，由于主办未正式开票，下单后无法立即配送票品。一般演出前2-6周出票，待正式开票后将在第一时间为您配送，请耐心等待。纸质票购票后可在订单详情页查看物流信息
                    </div>
                </div>
            </div>
        // }
    }

    timeSelect(e) {
        let n = this.state.timeList;
        for (let a = 0; a < n.length; a++) {
            n[a] = 0;
        }
        n[e] = 1;
        this.setState({
            timeList: n
        });
        n = "";
    }

    priceSelect(e) {
        let n = this.state.priceList;
        let m = 0;
        for (let a = 0; a < n.length; a++) {
            n[a].state = 0;
        }
        n[e].state = 1;
        m = n[e].price;
        this.setState({
            priceList: n,
            num: m
        });
        n = "";
        m = "";
    }

    sum() {
        let e = this.state.num;
        let n = this.state.count;
        return e * n;
    }



    render() {
        return (
            <div className={abouti.abouti}>
                <div className={abouti.showPoster}>
                    <div className={abouti.poster}>
                        <img src={require("../../Assets/images/poster1.jpg")} />
                        <div className={abouti.posterSign}>
                            <Sign/>
                        </div>

                    </div>
                </div>

                <div className={abouti.showInfo}>
                    {/*<div className={abouti.righttop}>{this.props.aboutitem.name}</div>*/}
                    <div className={abouti.showName}>【广州站】李荣浩年少有为世界巡回演唱会</div>
                    <div className={abouti.showTime}>时间：{this.props.aboutitem.showtime}</div>
                    <div className={abouti.showAvenue}>
                        {/*<div className={abouti.rightmid}>场馆：{this.props.aboutitem.address}
                            <Divider type={"vertical"}/>
                        {this.props.aboutitem.addressdetail}
                        </div>*/}
                        场馆：广州
                        <Divider type={"vertical"} style={{height:'26px'}}/>
                        广州国际体育演艺中心
                    </div>

                    {this.isPreSale(this.props.aboutitem.shoptime)}

                    <div className={abouti.showTip}>
                        <div className={abouti.exclamation}>!</div>
                        <div>场次时间均为演出当地时间</div>
                    </div>

                    <div className={abouti.showSessions}>
                        <div className={abouti.showSessionTag}>场次</div>
                        <div className={abouti.showSession}>
                            {this.props.aboutitem.timelist.map((t, ind) => {
                                if (ind === 0) {
                                    this.state.timeList.push(1);
                                    return <div key={ind} className={this.state.timeList[ind] ? abouti.chosen : abouti.unChosen} onClick={this.timeSelect.bind(this, ind)}>{t}</div>
                                }
                                else {
                                    this.state.timeList.push(0);
                                    return <div key={ind} className={this.state.timeList[ind] ? abouti.chosen : abouti.unChosen} onClick={this.timeSelect.bind(this, ind)}>{t}</div>
                                }
                            })}
                        </div>
                    </div>

                    <div className={abouti.showSessions}>
                        <div className={abouti.showSessionTag}>票档</div>
                        <div className={abouti.showSession}>
                            {this.props.aboutitem.pricelist.map((p, ind) => {
                                if (ind === 0) {
                                    this.state.priceList.push({ state: 1, price: p.price });
                                    return <div key={ind} className={this.state.priceList[ind].state ? abouti.chosen : abouti.unChosen} onClick={this.priceSelect.bind(this, ind)}>{p.price}</div>
                                }
                                else {
                                    this.state.priceList.push({ state: 0, price: p.price });
                                    return <div key={ind} className={this.state.priceList[ind].state ? abouti.chosen : abouti.unChosen} onClick={this.priceSelect.bind(this, ind)}>{p.price}</div>
                                }

                            })}
                        </div>
                    </div>

                    <div className={abouti.showSessions}>
                        <div className={abouti.showSessionTag}>数量</div>
                        <InputNumber defaultValue={1} step="1" min="1" style={{marginLeft: "10px"}}/>
                    </div>

                    <div className={abouti.showSession}>
                        <div className={abouti.showSessionTag}>合计</div>
                        <div className={abouti.sum}>
                            ￥{this.sum(this.state.num)}
                        </div>
                    </div>

                    <div className={abouti.buyNow}>
                        立即购买
                    </div>
                </div>
            </div>
        )
    }
}

