import React, {Component} from 'react';
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import page from "./Page.module.css";
import Axios from '../../Module/Axios';
import PageItem from "./PageItem";
import {categoryMap} from './categoryMap'
import qs from 'qs'
import 'antd/dist/antd.css';
import {Button, DatePicker, Result} from 'antd';
import {SmileTwoTone} from "@ant-design/icons";
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/lib/icons/RightOutlined";
import {url} from "../../Constants/constants"

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: (typeof (this.props.location.state)!="undefined")?this.props.location.state.type:'全部',
            city: (typeof (this.props.location.state)!="undefined")?this.props.location.state.city:'全国',
            time:'',
            timeID: 0,
            collapseFlag:true,
            AllCity: [],
            types: ["全部", "演唱会", "话剧歌剧", "体育", "儿童亲子","展览休闲","音乐会","曲苑杂坛", "舞蹈芭蕾" ],
            times: ["全部", "今天", "明天", "本周末", "一个月内"],
            data: [],
            searchKeyword:null,
            currentPage: 1,
        };
    }
    changeCity=(newCity)=>{
        this.setState({
            city:newCity
        },()=>this.getFilteredData());

    }
    changeType=(newType)=>{
        this.setState({
            type:newType
        },()=>this.getFilteredData());
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
    getFilteredData(){
        let city=null,category=null,keyword=''
        console.log(this.state.city)
        if(this.state.city!=='全国')
            city=this.state.city

        if(this.state.type!=='全部')
            category=categoryMap.get(this.state.type)

        if(this.state.searchKeyword)
            keyword=this.state.searchKeyword

        console.log(city)
        console.log(category)
        console.log(keyword)
        Axios.post(url+'/show/searchShow',qs.stringify({keyword:keyword,pagesize:20,currentsize:1,category:category,sub_category:null,city:city})).then(
            (res)=>{
                console.log(res.data)
                this.setState({
                    data:res.data
                })
            }
        )
    }
    goAbout(id, platform) {
        this.props.history.push({ pathname: "/about" + `/${id}` + `/${platform}`})
    }
    getPageItem(i) {
        if (i.length < 1) {
            return <Result
                className={page.noResult}
                icon={<SmileTwoTone />}
                title="没有找到符合条件的商品。您可以减少筛选条件重新搜索。"
            />
        } else {
            return (i.map((item, index) => {
                return <PageItem goAbout={(id, platform)=>this.goAbout(id, platform)} poster={item} key={index} data-cy={'pageItem'}/>
            }))
        }
    }
    fetchPage(page){
        let city=null,category=null,keyword=''
        if(this.state.city!=='全国')
            city=this.state.city

        if(this.state.type!=='全部')
            category=categoryMap.get(this.state.type)

        if(this.state.searchKeyword)
            keyword=this.state.searchKeyword
        Axios.post(url+'/show/searchShow',qs.stringify({keyword:"",pagesize:20,currentsize:page,category:category,sub_category:null,city:city})).then(
            (res)=>{
                this.setState({
                    data: res.data,
                    currentPage: page
                })
                document.documentElement.scrollTop = 0;  //ie下
                document.body.scrollTop = 0;  //非ie
            }
        )
        // console.log(page);
    }
    parseSearchParams=(pairs)=>{
        let keyword='',category=null,city=null
        for(let index in pairs){
            let [key,value]=pairs[index].split('=')
            if(key==='keyword') {
                keyword = /^%/.test(value)?decodeURI(value):value
                this.setState({
                    searchKeyword:value
                })
            }
        }
        if(this.state.type!=='全部')
            category=categoryMap.get(this.state.type)
        if(this.state.city!=='全国')
            city=this.state.city
        Axios.post(url+'/show/searchShow',qs.stringify({keyword:keyword,pagesize:20,currentsize:1,category:category,sub_category:null,city:city})).then(
            (res)=>{
                this.setState({
                    data:res.data
                })
            }
        )
    }
    componentDidMount() {
        Axios.get(url+'/show/getAllCityWithShowNow').then(
            res=>{
                let citys=res.data
                let tempArr=['全国']
                for(let index in citys){
                    tempArr.push(citys[index])
                }

                this.setState({
                    AllCity:tempArr,
                })
            }
        )
        let pairs=this.props.location.search.slice(1,).split('&')
        this.parseSearchParams(pairs)

    }
    componentWillReceiveProps(nextProps, nextContext) {
        let pairs=nextProps.location.search.slice(1,).split('&')
        this.parseSearchParams(pairs)
    }

    render() {
        var MoreCitys=[]
        let length=this.state.AllCity.length
        for(let i=1;i<=length/9;i++){
            MoreCitys.push(
                <div className={page.titleBox}>
                    {
                        this.state.AllCity.slice(8+9*(i-1), 8+9*i).map((item, index) => {
                            return <div
                                className={page.titleOne + (this.state.city===item ? (' ' + page.titleSelected) : '')}
                                onClick={() => this.changeCity(item)}>{item}</div>
                        })
                    }
                </div>
            )
        }
        return (
            <div>
                <div >
                    <Nav pageIdent="page" history={this.props.history}/>
                </div>
                <div className={page.base}>
                    <div className={page.title}>
                        <div className={page.titleContainer}>
                            <div className={page.horizontal} >
                                <span>当 前 选 中 城 市：</span>
                                <div className={page.titleOne+' ' + page.titleSelected} data-cy={'citySelected'}>{this.state.city}</div>
                            </div>
                            <span>城 市：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.AllCity.slice(0,8).map((item, index) => {
                                        return <div className={page.titleOne + (this.state.city === item ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeCity(item)} data-cy={`select:${item}`}>{item}</div>
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
                        <div className={page.line}/>
                        <div className={page.titleContainer}>
                            <span>分 类：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.types.map((item, index) => {
                                        return <div
                                                    data-cy={this.state.type === item?'typeSelected':`select:${item}`}
                                                    className={page.titleOne + (this.state.type === item ? (' ' + page.titleSelected) : '')}
                                                    onClick={()=>this.changeType(item)}
                                                >
                                                    {item}
                                                </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className={page.line}/>
                        <div className={page.titleContainer}>
                            <span>时 间：</span>
                            <div className={page.titleBox}>
                                {
                                    this.state.times.map((item, index) => {
                                        return <div className={page.titleOne + (this.state.timeID === index ? (' ' + page.titleSelected) : '')} onClick={()=>this.changeTime(index,item)} >{item}</div>
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
                        {this.getPageItem(this.state.data)}
                        {/*<Pagination defaultCurrent={1} total={50} className={page.paging} />*/}
                        <div style={{width:"100%", marginBottom:"10px"}}>
                            {this.state.currentPage === 1?
                                <Button type="text" size="large" style={{float:"left"}} disabled><LeftOutlined />上一页</Button> :
                                <Button type="text" size="large" style={{float:"left"}} onClick={this.fetchPage.bind(this, this.state.currentPage - 1)} data-cy={'lastPage'}><LeftOutlined />上一页</Button>
                            }
                            <Button type="text" size="large" style={{float:"right"}} onClick={this.fetchPage.bind(this, this.state.currentPage + 1)} data-cy={'nextPage'}><RightOutlined />下一页</Button>
                        </div>
                    </div>
                </div >
                <Bottom/>
            </div>
        )
    }
}
