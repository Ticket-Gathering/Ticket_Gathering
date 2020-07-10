import React, { Component } from 'react'
import navstyle from './Nav.module.css'
import { Link } from 'react-router-dom';
import {Cascader,Select} from "antd";
import addressData from "./CityData";
import Axios from "../Module/Axios";
const { Option } = Select;
export default class nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            cityValue:'全国',
            username: 'test',
            isLoggedIn:false
        }
    };
    componentWillMount() {
        if(sessionStorage.getItem('token')) {
            Axios.get("/user/getAccount")
                .then(res => {
                    this.setState({
                        username: res.data.account
                    })

                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({
                isLoggedIn:true
            })
        }else{
            this.setState({
                isLoggedIn:false
            })
        }
    }

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
                                    <div style={{marginLeft: 5 + "px"}}>
                                        <Select style={{width: 144 + "px", color: "#999999"}}
                                                defaultValue="全国"
                                                value={this.state.cityValue}
                                                onChange={(newValue)=>{this.setState({cityValue:newValue})}}
                                        >
                                            {addressData.map((item,index)=>{
                                                return <Option key={index} >{addressData[index].value}</Option>
                                            })}
                                        </Select>
                                    </div>
                                    {/*<img src={require('../ImgAssets/down.png')} className={navstyle.downarrow}></img>*/}
                                </div>
                            </div>
                        ) :
                            (<div/>)
                        }
                    <div className={navstyle.navbar}>
                        <div className={navstyle.index}><Link to='/'>首页</Link></div>
                        <div className={navstyle.page}><Link to={{pathname:'/page',state:{typeID:'0',cityID:this.state.cityValue}}}>分类</Link></div>
                    </div>
                    <div className={navstyle.search}>
                        <img src={require('../ImgAssets/search.png')} className={navstyle.searchimg}></img>
                        <input type="text" className={navstyle.input} placeholder="搜索明星、演出、体育赛事">
                        </input>
                    </div>
                    {this.state.isLoggedIn
                        ?
                        <div className={navstyle.loginbox}>
                            <div className={navstyle.logintext}>
                                欢迎您！{this.state.username}
                            </div>
                        </div>
                        :
                        <div className={navstyle.loginbox}>
                            <img src={require('../ImgAssets/login.png')}></img>
                            <div className={navstyle.logintext}><Link to="/login">登录</Link></div>
                        </div>

                    }
                    <div className={navstyle.loginbox}>
                        <img src={require('../ImgAssets/download.png')} ></img>
                        <div className={navstyle.logintext}>下载</div>
                    </div>
                    <div className={navstyle.loginbox}>
                        <img src={require('../ImgAssets/english.png')} ></img>
                        <div className={navstyle.logintext}>English</div>
                    </div>
                </div>
            </div>
        )
    }
}
