import React, { Component } from 'react'
import navstyle from './SimpleNav.module.css'
import { Link } from 'react-router-dom';
import {Select} from "antd";
const { Option } = Select;

export default class SimpleNav extends Component {

    constructor(props) {
        super(props);
        this.state={
            username: 'test',
            isLoggedIn:false,
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
    }
    render() {
        return (
            <div className={navstyle.nav}>
                <div className={navstyle.navson}>
                    <div className={navstyle.logo} onClick={()=>{this.props.history.push({pathname:'/'})}}>
                        <img src={require('../../ImgAssets/logo.png')} />
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
                            <img src={require('../../ImgAssets/login.png')}/>

                            <div className={navstyle.logintext}><Link to="/login">登录</Link></div>
                        </div>

                    }
                </div>
            </div>
        )
    }
}
