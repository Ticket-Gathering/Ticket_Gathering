import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import AuctionItem from "./auctionItem";
import about from "./auction.module.css";
import Axios from "../../Module/Axios";
import Bottom from "../../Components/Bottom";
import {url} from "../../Constants/constants";
import ErrorPage from "../Error/ErrorPage";
import {Button} from "antd";
import abouti from "./auctionItem.module.css";

export default class Auction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{},
            detail:{detail:"",images:[],notice0:"",notice1:""},
            introduce: [],
            success:false
        }
    }
    componentDidMount() {
        let data = new FormData();
        data.append("id",1);

        Axios.post(url+"/auction/getAuction", data
        ).then((res) => {
            console.log(res.data)
            this.setState({
                data : res.data,
                detail :res.data.showDetail,
                start_time:res.data.start_time,
                end_time:res.data.end_time,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className={about.about}>
                <Nav/>
                <div className={about.base}>
                    <div className={about.briefInfo}>
                        <AuctionItem aboutitem={this.state.data}/>
                    </div>
                    <div style={{paddingBottom: "10px"}}>
                        <div className={about.subNavs}>
                            <div className={about.subNav}>
                                <a href="#xmxq">项目详情</a>
                            </div>
                            <div className={about.subNav}>
                                <a href="#gpxz">购票须知</a>
                            </div>
                            <div className={about.subNav}>
                                <a href="#gyxz">观演须知</a>
                            </div>
                        </div>
                        <div className={about.showDetails} id="xmxq">
                            <div className={about.subtitle}>温馨提示</div>
                            <div className={about.line}/>
                            <span className={about.detailText}>本项目不支持使用优惠券购票，敬请理解</span>
                            <div className={about.subtitle}>演出介绍</div>
                            <div className={about.line}/>
                            {
                                this.state.detail.detail.split("\n").map(text =>
                                    <div className={about.detailText}>{text}</div>
                                )
                            }
                            {
                                this.state.detail.images.map(image =>
                                    <img src={image} className={about.img}/>
                                )
                            }
                        </div>
                        <div className={about.showDetails} id="gpxz">
                            <div className={about.subtitle}>购票须知</div>
                            <div className={about.line}/>
                            {
                                this.state.detail.notice0.split("\n").map((text, idx) => {
                                    if(idx%2 === 0){
                                        return <div className={about.tipTitle}>{text}</div>
                                    } else {
                                        return <div className={about.tip}>{text}</div>
                                    }
                                })
                            }
                        </div>
                        <div className={about.showDetails} id="gyxz">
                            <div className={about.subtitle}>观演须知</div>
                            <div className={about.line}/>
                            {
                                this.state.detail.notice1.split("\n").map((text, idx) => {
                                    if(idx%2 === 0){
                                        return <div className={about.tipTitle}>{text}</div>
                                    } else {
                                        return <div className={about.tip}>{text}</div>
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <Bottom/>
            </div>
        )
    }
}
