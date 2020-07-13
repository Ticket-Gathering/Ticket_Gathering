import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import page from "./Page.module.css";
import Axios from '../../Module/Axios';
import Posterb from "../../Components/Posterb";
import 'antd/dist/antd.css';
import { Pagination, Result, Icon, Button } from 'antd';
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeID: (typeof (this.props.location.state)!="undefined")?this.props.location.state.typeID:0,
            cityID: (typeof (this.props.location.state)!="undefined")?(this.props.location.state.cityID=="全国"?0:this.props.location.state.cityID):0,
            timeID: 0,
            sid: 1,
            citys: ["全国", "上海", "北京", "浙江", "四川", "广东", "江苏", "湖北", "天津"],
            types: ["全部", "演唱会", "话剧歌剧", "体育", "儿童亲子","展览休闲","音乐会","曲苑杂坛", "舞蹈芭蕾" ],
            times: ["全部", "今天", "明天", "本周末", "一个月内"],
            sorts: ["相关度排序", "推荐排序", "最近开场", "最新上架"],
            data: [],
            city: '',
            type: ''
        }
    }
    changeCity=(newCityID, newCity)=>{
        this.setState({
            cityID:newCityID,
            city:newCity
        });
        this.getData();
    }
    changeType=(newTypeID,newType)=>{
        this.setState({
            typeID:newTypeID,
            type:newType
        });
        this.getData();

    }
    changeTime=(newTimeID) =>{
        this.setState({
            timeID:newTimeID

        })
    }
    changestyle3(sid) {
        this.setState({
            sid

        })
    }
    getPosterb(i) {
        if (i.length < 1) {
            return <Result
                icon={<Icon type="smile" theme="twoTone" />}
                title="没有找到符合条件的商品。您可以减少筛选条件重新搜索。"
                extra={<Button type="primary">Next</Button>}
            />
        } else {
            return (i.map((item, ind) => {
                return <Posterb poster={item} key={ind}></Posterb>
            }))
        }
    }
    getData() {
        Axios.get("/page/getClassify", { params: { city: this.state.city, type: this.state.type } }).then(res => {
            this.setState({
                data: res.data
            })
            console.log(res.data)
        })
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        Axios.get("/page/getClassify").then(res => {
            this.setState({
                data: res.data
            })
        })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <div >
                    <Nav pageIdent="page"></Nav>
                </div>
                <div>

                    <div className={page.title}>
                        <div className={page.titleone}>
                            <span>当 前 选 中 城 市：</span>
                            <br/>
                            <span>城 市：</span>
                            <div className={page.titlebox}>
                                {
                                    this.state.citys.map((item, index) => {
                                        console.log(this.state.cityID)
                                        return <div className={page.titleUnselected + (this.state.cityID == index ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeCity(index,item)} >{item}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div className={page.line}></div>
                        <div className={page.titleone}>
                            <span>分 类：</span>
                            <div className={page.titlebox}>
                                {
                                    this.state.types.map((item, index) => {
                                        return <div className={page.titleUnselected + (this.state.typeID == index ? (' ' + page.titleSelected) : '')}  onClick={()=>this.changeType(index,item)} >{item}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div className={page.line}></div>
                        <div className={page.titleone}>
                            <span>时 间：</span>
                            <div className={page.titlebox}>
                                {
                                    this.state.times.map((item, index) => {
                                        return <div className={page.titleUnselected + (this.state.timeID == index ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeTime(index)} >{item}</div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={page.showbox}>
                        <div className={page.showbox1}>
                            {this.state.sorts.map((item, index) => {
                                return <div className={page.showevery + (this.state.sid == index ? (' ' + page.showevery1) : '')} key={index} onClick={()=>this.changestyle3.bind(this, index)} >{item}</div>
                            })}
                        </div>
                        {this.getPosterb(this.state.data)}
                        <Pagination defaultCurrent={1} total={50} className={page.paging} />
                    </div>
                    <Bottom></Bottom>
                </div >
            </div>
        )
    }
}
