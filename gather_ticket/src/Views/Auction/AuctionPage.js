import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import Bottom from "../../Components/Bottom";
import page from "./AuctionPage.module.css";
import Axios from '../../Module/Axios';
import PageItem from "../Page/PageItem";
import {categoryMap} from '../Page/categoryMap'
import qs from 'qs'
import 'antd/dist/antd.css';
import { Pagination, Result, Button,DatePicker} from 'antd';
import {SmileTwoTone} from "@ant-design/icons";
import {url} from "../../Constants/constants"

export default class ActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '全部',
            city: '全国',
            collapseFlag:true,
            AllCity: [],
            types: ["全部", "演唱会", "话剧歌剧", "体育", "儿童亲子","展览休闲","音乐会","曲苑杂坛", "舞蹈芭蕾" ],
            data: [],
            preFilteredData: [],
            searchKeyword:null,
        };
    }
    changeCity=(newCity)=>{
        if(newCity === "全国"){
            this.setState({
                data : this.state.preFilteredData,
                city : newCity,
            })
            return;
        }
        let filteredData = this.state.preFilteredData;
        filteredData = filteredData.filter(item => item.show.city === newCity);
        this.setState({
            data : filteredData,
            city : newCity,
        })
    }
    changeType=(newType)=>{
        if(newType === "全部"){
            this.setState({
                data : this.state.preFilteredData,
                type : newType,
            })
            return;
        }
        let filteredData = this.state.preFilteredData;
        filteredData = filteredData.filter(item => item.show.category === categoryMap.get(newType));
        this.setState({
            data : filteredData,
            type : newType,
        })
    }
    goAbout(id, platform) {
        this.props.history.push({ pathname: "/auction" + `/${id}`})
    }
    getPageItem(i) {
        console.log(i)
        if (i.length < 1) {
            return <Result
                className={page.noResult}
                icon={<SmileTwoTone />}
                title="没有找到符合条件的商品。您可以减少筛选条件重新搜索。"
            />
        } else {
            return (i.map((item, index) => {
                if(!item.show) return ;
                return <PageItem goAbout={(id, platform)=>this.goAbout(item.aucid, platform)} poster={item.show} key={index} data-cy={'pageItem'}/>
            }))
        }
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
        Axios.get(url+"/auction/getAllAuction").then(res => {
            console.log(res.data);
            this.setState({
                data: res.data,
                preFilteredData: res.data,
            })
        }).catch(function (error) {
            console.log(error);
        });

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
                    </div>
                    <div className={page.showContainer}>
                        {this.getPageItem(this.state.data)}
                        {/*<Pagination defaultCurrent={1} total={50} className={page.paging} />*/}
                        {/*<div style={{width:"100%", marginBottom:"10px"}}>*/}
                        {/*    {this.state.currentPage === 1?*/}
                        {/*        <Button type="text" size="large" style={{float:"left"}} disabled><LeftOutlined />上一页</Button> :*/}
                        {/*        <Button type="text" size="large" style={{float:"left"}} onClick={this.fetchPage.bind(this, this.state.currentPage - 1)} data-cy={'lastPage'}><LeftOutlined />上一页</Button>*/}
                        {/*    }*/}
                        {/*    <Button type="text" size="large" style={{float:"right"}} onClick={this.fetchPage.bind(this, this.state.currentPage + 1)} data-cy={'nextPage'}><RightOutlined />下一页</Button>*/}
                        {/*</div>*/}
                    </div>
                </div >
                <Bottom/>
            </div>
        )
    }
}
