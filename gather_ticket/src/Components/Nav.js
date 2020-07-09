import React, { Component } from 'react'
import navstyle from './Nav.module.css'
import { Link } from 'react-router-dom';
import {Cascader,Select} from "antd";
import addressData from "./CityData";
const children = [];
const { Option } = Select;
for (let i = 0;i<addressData.length;i++) {
    children.push(<Option key={addressData[i].value}>{addressData[i].value}</Option>);
}
export default class nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            cityValue:[]
        }
    };
    cityPick=(e)=>{
        console.log(e)
        if(e.length<=0){
            this.setState({
                cityValue:["全国"]
            })
            return;
        }
        this.setState({
            cityValue:[e[0]]
        })
    };
    render() {
        return (
            <div className={navstyle.nav}>
                <div className={navstyle.navson}>
                    <div className={navstyle.logo}>
                        <img src={require('../ImgAssets/logo.png')} ></img>
                    </div>
                        {this.props.pageIdent == "home" ? (
                            <div className={navstyle.global}>
                                <div className={navstyle.globalt}>
                                    <div className={navstyle.position}>
                                        <img src={require('../ImgAssets/location.png')}></img>
                                    </div>
                                    <div style={{backgroundColor: "#28282a", marginLeft: 5 + "px"}}>
                                        <Select style={{width: 144 + "px", color: "#999999"}}
                                                placeholder={'请选择所在城市'}>
                                            {children}
                                        </Select>
                                    </div>
                                    {/*<div className={navstyle.text}>全国</div>*/}
                                    {/*<img src={require('../ImgAssets/down.png')} className={navstyle.downarrow}></img>*/}
                                </div>
                            </div>
                        ) :
                            (<div/>)
                        }
                    <div className={navstyle.navbar}>
                        <div className={navstyle.index}><Link to='/'>首页</Link></div>
                        <div className={navstyle.page}><Link to={{pathname:'/page',state:{typeID:'0'}}}>分类</Link></div>
                    </div>
                    <div className={navstyle.search}>
                        <img src={require('../ImgAssets/search.png')} className={navstyle.searchimg}></img>
                        <input type="text" className={navstyle.input} placeholder="搜索明星、演出、体育赛事">
                        </input>
                    </div>
                    <div className={navstyle.loginbox}>
                        <img src={require('../ImgAssets/login.png')} className={navstyle.loginimg}></img>
                        <div className={navstyle.logintext}><Link to="/login">登录</Link></div>
                    </div>
                    <div className={navstyle.downbox}>
                        <img src={require('../ImgAssets/download.png')} className={navstyle.loginimg}></img>
                        <div className={navstyle.logintext}>下载</div>
                    </div>
                    <div className={navstyle.downbox}>
                        <img src={require('../ImgAssets/english.png')} className={navstyle.loginimg}></img>
                        <div className={navstyle.logintext}>English</div>
                    </div>
                </div>
            </div>
        )
    }
}
