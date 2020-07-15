import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import page from "./Page.module.css";
import Axios from '../../Module/Axios';
import Posterb from "../../Components/PageItem"
import 'antd/dist/antd.css';
import addressData from "../../Components/CityData";
import { Pagination, Result, Icon, Button,DatePicker} from 'antd';
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeID: (typeof (this.props.location.state)!="undefined")?this.props.location.state.typeID:0,
            cityID: (typeof (this.props.location.state)!="undefined")?(this.props.location.state.cityID=="全国"?0:this.props.location.state.cityID):0,
            timeID: 0,
            filterID: 1,
            city: '',
            type: '',
            time:'',
            collapseFlag:true,
            citys: [],
            types: ["全部", "演唱会", "话剧歌剧", "体育", "儿童亲子","展览休闲","音乐会","曲苑杂坛", "舞蹈芭蕾" ],
            times: ["全部", "今天", "明天", "本周末", "一个月内"],
            sorts: ["相关度排序", "推荐排序", "最近开场", "最新上架"],
            data: [
                {aid:1, name:'作业测试',address:'上海',show_time:'2020-8-12',img_url:require('../../ImgAssets/testCarousel/posterTest1.jpg'),price:40,show_status:1,category:1,platform:'大麦网'},
                {aid:2, name:'作业测试',address:'上海',show_time:'2020-8-12',img_url:require('../../ImgAssets/testCarousel/posterTest2.jpg'),price:40,show_status:2,category:2,platform:'摩天轮'},
                {aid:3, name:'作业测试',address:'上海',show_time:'2020-8-12',img_url:require('../../ImgAssets/testCarousel/posterTest3.jpg'),price:40,show_status:3,category:3,platform:'永乐票务'}
                ],
        }
    }
    componentWillMount() {
        let tempArr=[]
        for(let i=0;i<addressData.length;i++){
            tempArr.push(addressData[i].value)
        }
        this.setState({
            city:tempArr[this.state.cityID],
            citys:tempArr
        })
    }

    changeCity=(newCityID, newCity)=>{
        console.log(newCityID)
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
    changeTime=(newTimeID,newTime) =>{
        this.setState({
            timeID:newTimeID,
            time:newTime,
        })
    }
    changeDate=(_,dateString)=>{
        this.setState({
            timeID:-1,
            time:dateString,
        })
    }
    changeFilter=(newFilterID)=> {
        this.setState({
            filterID:newFilterID
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
        var MoreCitys=[]
        for(let i=1;i<4;i++){
            MoreCitys.push(
                <div className={page.titleBox}>
                    {
                        this.state.citys.slice(8+9*(i-1), 8+9*i).map((item, index) => {
                            return <div
                                className={page.titleOne + (this.state.city==item ? (' ' + page.titleSelected) : '')}
                                onClick={() => this.changeCity(index, item)}>{item}</div>
                        })
                    }
                </div>
            )
        }
        return (
            <div>
                <div >
                    <Nav pageIdent="page"></Nav>
                </div>
                <div>

                    <div className={page.title}>
                        <div className={page.titleContainer}>
                            <div className={page.horizontal} >
                                <span>当 前 选 中 城 市：</span>
                                <div className={page.titleOne+' ' + page.titleSelected}>{this.state.city}</div>
                            </div>
                            <span>城 市：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.citys.slice(0,8).map((item, index) => {
                                        return <div className={page.titleOne + (this.state.city == item ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeCity(index,item)} >{item}</div>
                                    })
                                }
                                <div className={page.showMore} onClick={()=>this.setState({collapseFlag:!this.state.collapseFlag})}><u>{this.state.collapseFlag?'显示更多':'收起'}</u></div>
                            </div>
                            <div>
                                {!this.state.collapseFlag
                                    ?<div>{MoreCitys}</div>
                                    : <div/>
                                }
                            </div>
                        </div>
                        <div className={page.line}></div>
                        <div className={page.titleContainer}>
                            <span>分 类：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.types.map((item, index) => {
                                        return <div className={page.titleOne + (this.state.typeID == index ? (' ' + page.titleSelected) : '')}  onClick={()=>this.changeType(index,item)} >{item}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div className={page.line}></div>
                        <div className={page.titleContainer}>
                            <span>时 间：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.times.map((item, index) => {
                                        return <div className={page.titleOne + (this.state.timeID == index ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeTime(index,item)} >{item}</div>
                                    })
                                }
                                <div className={page.datePicker}>
                                    <DatePicker placeholder={'按日历'} size={'small'}
                                                onChange={(_,dateString)=>this.changeDate(_,dateString)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={page.showContainer}>
                        {/*<div className={page.showBox}>*/}
                        {/*    {this.state.sorts.map((item, index) => {*/}
                        {/*        return <div className={page.showOne + (this.state.filterID == index ? (' ' + page.showSelected) : '')} key={index} onClick={()=>this.changeFilter(index)} >{item}</div>*/}
                        {/*    })}*/}
                        {/*</div>*/}
                        {this.getPosterb(this.state.data)}
                        <Pagination defaultCurrent={1} total={50} className={page.paging} />
                    </div>
                    <Bottom></Bottom>
                </div >
            </div>
        )
    }
}
