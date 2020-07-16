import React, { Component } from 'react'
import navstyle from './Nav.module.css'
import { Link } from 'react-router-dom';
import {Cascader,Select,Input} from "antd";
import Axios from "../Module/Axios";
const {Search} =Input;
const { Option } = Select;
const url= "http://localhost:8080";
export default class nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            cityValue:'全国',
            username: 'test',
            isLoggedIn:false,
            AllCity:[]
        }
    };
    componentWillMount() {
        if(sessionStorage.getItem('userId') !== 'NULL') {
            this.setState({
                username: sessionStorage.getItem('username'),
                isLoggedIn:true
            })
        }else{
            this.setState({
                isLoggedIn:false
            })
        }
        Axios.get(url+'/getAllCityWithShowNow').then(
            res=>{
                let citys=res.data
                let tempArr=[]
                tempArr.push({value:'全国',label:-1})
                this.setState({
                    AllCity:tempArr
                })
                for(let index in citys){
                    let city=citys[index]
                    let tempObject={}
                    tempObject.value=city
                    tempObject.label=index
                    tempArr.push(tempObject)
                }
                tempArr.push({value:'全国',label:-1})
                this.setState({
                    AllCity:tempArr
                })
            }
        )
    }


    onSearch=(event)=>{
        if(event.key=='Enter'){
            this.props.history.push("/page?keyword="+document.getElementById('search').value)
        }
    }
    render() {
        return (
            <div className={navstyle.nav}>
                <div className={navstyle.navson}>
                    <div className={navstyle.logo}>
                        <img src={require('../ImgAssets/logo.png')} />
                    </div>
                        {this.props.pageIdent === "home" ? (
                            <div className={navstyle.global}>
                                <div className={navstyle.globalt}>
                                    <div className={navstyle.position}>
                                        <img src={require('../ImgAssets/location.png')}/>
                                    </div>
                                    <div style={{marginLeft: 5 + "px"}}>
                                        <Select style={{width: 144 + "px", color: "#999999"}}
                                                defaultValue="全国"
                                                value={this.state.cityValue}
                                                onChange={(newValue,option)=>{this.setState({cityValue:option.props.children});this.props.setCityValue(option.props.children);}}
                                        >
                                            {this.state.AllCity.map((item,index)=>{
                                                return <Option key={index} >{this.state.AllCity[index].value}</Option>
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
                        <div className={navstyle.page}><Link to={{pathname:'/page',state:{type:'全部',city:this.state.cityValue}}}>分类</Link></div>
                    </div>
                    <div className={navstyle.search}>
                        <img src={require('../ImgAssets/search.png')} className={navstyle.searchimg}/>
                        <input type="text" id={'search'} className={navstyle.input} placeholder="搜索明星、演出、体育赛事" onKeyPress={(e)=>this.onSearch(e)}>
                        </input>
                    </div>
                    {this.state.isLoggedIn
                        ?
                        <div className={navstyle.loginbox}>
                            <div className={navstyle.logintext}>
                                欢迎您！<Link to="/self">{this.state.username}</Link>
                            </div>
                        </div>
                        :
                        <div className={navstyle.loginbox}>
                            <img src={require('../ImgAssets/login.png')}/>

                            <div className={navstyle.logintext}><Link to="/login">登录</Link></div>
                        </div>

                    }
                    <div className={navstyle.loginbox}>
                        <img src={require('../ImgAssets/download.png')} />
                        <div className={navstyle.logintext}>下载</div>
                    </div>
                    <div className={navstyle.loginbox}>
                        <img src={require('../ImgAssets/english.png')} />
                        <div className={navstyle.logintext}>English</div>
                    </div>
                </div>
            </div>
        )
    }
}
