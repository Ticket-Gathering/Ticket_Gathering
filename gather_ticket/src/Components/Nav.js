import React, { Component } from 'react'
import navstyle from './Nav.module.css'
import { Link } from 'react-router-dom';
import {Cascader,Select,Input} from "antd";
import Axios from "../Module/Axios";
import Cookies from 'js-cookie'
import {url} from "../Constants/constants"
import {Badge} from "element-react"
const {Search} =Input;
const { Option } = Select;

export default class nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            cityValue:'全国',
            username: 'test',
            isLoggedIn:false,
            messageChecked: 1,
            AllCity:[]
        }
    };
    componentWillMount() {
        let userId=Cookies.get('userId')
        if(!isNaN(parseInt(userId))&& userId !== null) {
            this.setState({
                username: Cookies.get('username'),
                isLoggedIn:true
            })
            Axios.get(url + "/getUserById/" + userId).then(res => {
                console.log("user");
                console.log(res)
                this.setState({
                    messageChecked: res.data.messageChecked,
                })
            })
        }else{
            this.setState({
                isLoggedIn:false
            })
        }
        Axios.get(url+'/show/getAllCityWithShowNow').then(
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
        if(event.key==='Enter'){
            this.props.history.push("/page?keyword="+document.getElementById('search').value)
        }
    }
    render() {
        return (
            <div className={navstyle.nav}>
                <div className={navstyle.navson}>
                    <div className={navstyle.logo} onClick={()=>this.props.history.push({pathname:'/'})}>
                        <img src={require('../ImgAssets/logo.svg')} />
                        <span className={navstyle.webFont}>聚票</span>
                    </div>
                        {this.props.pageIdent === "home" ? (
                            <div className={navstyle.global}>
                                <div className={navstyle.globalt}>
                                    <div className={navstyle.position}>
                                        <img src={require('../ImgAssets/location.png')}/>
                                    </div>
                                    <div style={{marginLeft: 5 + "px"}}>
                                        <Select
                                            data-cy={'selectCity'}
                                                style={{width: 144 + "px", color: "#999999"}}
                                                defaultValue="全国"
                                                value={this.state.cityValue}
                                                onChange={(newValue,option)=>{this.setState({cityValue:option.props.children});this.props.setCityValue(option.props.children);}}
                                        >
                                            {this.state.AllCity.map((item,index)=>{
                                                return <Option key={index} data-cy={this.state.AllCity[index].value} >{this.state.AllCity[index].value}</Option>
                                            })}
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
                        <div className={navstyle.page}><Link to={{pathname:'/page',state:{type:'全部',city:this.state.cityValue}}} data-cy={'classify'}>分类</Link></div>
                    </div>
                    <div className={navstyle.search}>
                        <img src={require('../ImgAssets/search.png')} className={navstyle.searchimg}/>
                        <input type="text" id={'search'} className={navstyle.input} placeholder="搜索明星、演出、体育赛事" onKeyPress={(e)=>this.onSearch(e)}>
                        </input>
                    </div>
                    {this.state.isLoggedIn
                        ?
                        <div className={navstyle.loginbox} >
                            <div>
                                <span className={navstyle.logintext}>欢迎您！</span>
                                {this.state.messageChecked === 0?
                                    <Badge isDot>
                                        <Link to="/self" data-cy={'self'} className={navstyle.logintext}>{this.state.username}</Link>
                                    </Badge>:
                                    <Link to="/self" data-cy={'self'} className={navstyle.logintext}>{this.state.username}</Link>
                                }

                            </div>
                        </div>
                        :
                        <div className={navstyle.loginbox} >
                            <img src={require('../ImgAssets/login.png')}/>
                            <div className={navstyle.logintext}><Link to="/login" data-cy={'login'}>登录</Link></div>
                        </div>

                    }
                    <div className={navstyle.loginbox}>
                        <img src={require('../Views/Auction/锤子.png')} />
                        <Link to='/auctionPage'><div className={navstyle.logintext}>拍卖</div></Link>
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
