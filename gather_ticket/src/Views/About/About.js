import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import AboutItem from "./AboutItem";
import Paper from "./Paper";
import about from "./About.module.css";
import Poster from "../Home/posterItem";
import Axios from "../../Module/Axios";
import Bottom from "../../Components/Bottom";
import Recommend from "./Recommend";
import {withRouter} from "react-router-dom";
import ErrorPage from "../Error/ErrorPage";
import {url} from "../../Constants/constants"

const Data = {timelist:['2020.08.01 周六 20:00','2020.08.02 周日 20:00' ],pricelist:['100','120','188'],billtype:{chooice:1,getter:1,type:1},name:'李荣浩2019「年少有为」巡回演唱会',showtime:'2020.08.01-2020.08.02' ,address:'上海市 | 珍珠剧场The Pearl '};

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            success: false
        }

    }
    componentDidMount()
     {
        let data = new FormData();
        data.append("id", this.props.match.params.aid);

        Axios.post(url+"/show/getDetail", data
        ).then((res) => {
            console.log(res)
            this.setState({
                data : res.data,
                success: true
            })
        }).catch(err => {
                console.log(err);
        })
    }
    goAbout(id) {
        this.props.history.push({pathname: "/about" + `/${id}`})
        window.onbeforeunload = function(){
            document.documentElement.scrollTop = 0;  //ie下
            document.body.scrollTop = 0;  //非ie
        }
        window.location.reload(true);
    }


    render() {
        if(!this.state.success) return (<div>Loading...</div>)
             else if(this.state.data==="")return (<ErrorPage history={this.props.history}/>)
        else return (
            <div className={about.about}>
                <Nav pageIdent="page" history={this.props.history}/>
                <div className={about.base}>
                    <div className={about.briefInfo}>
                            <div className={about.showInfo}>
                                <AboutItem aboutitem={this.state.data} history={this.props.history}/>
                            </div>
                            <div className={about.ticketInfo}>
                                <Paper paper={this.state.data.show}/>
                            </div >
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
                                this.state.data.detail.split("\n").map(text =>
                                    <div className={about.detailText}>{text}</div>
                                )
                            }
                            {
                                this.state.data.images.map(image =>
                                    <img src={image} className={about.img}/>
                                )
                            }
                        </div>
                        <div className={about.showDetails} id="gpxz">
                            <div className={about.subtitle}>购票须知</div>
                            <div className={about.line}/>
                            {
                                this.state.data.notice0.split("\n").map((text, idx) => {
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
                                this.state.data.notice1.split("\n").map((text, idx) => {
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
                <Recommend subCategory={this.state.data.show.sub_category} goAbout={(id) => this.goAbout(id)}/>
                <Bottom/>
            </div>
        )
    }
}
export default withRouter(About);
