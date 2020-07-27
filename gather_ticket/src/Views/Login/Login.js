import React, { Component } from 'react'
import login from './Login.module.css';
import { Link } from 'react-router-dom';
import Bottom from "../../Components/Bottom";
import Axios from '../../Module/Axios'
import {Message} from 'element-react'
import Cookies from 'js-cookie'

const url = "http://localhost:8080";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginCard: true,
            signUpCard: false,
            curTab: 1,
            signUpForm: {
                username: "",
                password: "",
                repeatPassword: "",
            },
            loginForm: {
                username: "",
                password: ""
            },
            illegalUsername: true,
            illegalPassword: false,
        };
        this.changeToLogin = this.changeToLogin.bind(this);
        this.changeToSignUp = this.changeToSignUp.bind(this);
        this.inputUsernameSign = this.inputUsernameSign.bind(this);
        this.inputPasswordSign = this.inputPasswordSign.bind(this);
        this.inputPasswordSign2 = this.inputPasswordSign2.bind(this);
        this.inputUsername = this.inputUsername.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.login = this.login.bind(this);
        this.testUsernameDuplicate = this.testUsernameDuplicate.bind(this);
        this.testPasswordMatch = this.testPasswordMatch.bind(this);
    };

    changeToLogin() {
        this.setState({
            loginCard: true,
            signUpCard: false,
            curTab: 1
        })
    }
    changeToSignUp() {
        this.setState({
            loginCard: false,
            signUpCard: true,
            curTab: 2
        })
    }

    display() {
        switch (this.state.curTab) {
            case 1:
                return <div className={login.base}>
                    <input type="text" placeholder="请输入用户名" className={login.input} onChange={this.inputUsername}/>
                    <div className={login.logoUsr}>
                        <img src={require('../../Assets/images/ico/user2.png')}/>
                    </div>
                    <input type="password" placeholder="请输入登录密码" className={login.input} onChange={this.inputPassword}/>
                    <div className={login.logoLock}>
                        <img src={require('../../Assets/images/ico/lock2.png')}/>
                    </div>
                    <div className={login.loginBtn} onClick={this.login} data-cy={'login'}>LOGIN</div>
                    <div className={login.logoPlatforms}>
                        <div className={login.logoPlatform}>
                            <img src={require('../../Assets/images/ico/xin.png')}/>
                        </div>
                        <div className={login.logoPlatform}>
                            <img src={require('../../Assets/images/ico/haah.png')}/>
                        </div>
                        <div className={login.logoPlatform}>
                            <img src={require('../../Assets/images/ico/wei.png')}/>
                        </div>
                        <div className={login.logoPlatform}>
                            <img src={require('../../Assets/images/ico/zhi.png')}/>
                        </div>
                    </div>
                    <div className={login.bottomOptions}>
                        <div className={login.bottomOption}><Link to="/findpw">忘记密码</Link></div>
                        <div className={login.bottomOption} onClick={this.changeToSignUp}>免费注册</div>
                    </div>
                </div>;
                break;
            case 2:
                return <div className={login.base}>
                    <input type="text" placeholder="请输入用户名" className={login.input} onChange={this.inputUsernameSign} onBlur={this.testUsernameDuplicate}/>
                    <div className={login.logoUsr}>
                        <img src={require('../../Assets/images/ico/user2.png')}/>
                    </div>
                    <input type="password" placeholder="请输入登录密码" className={login.input} onChange={this.inputPasswordSign}/>
                    <div className={login.logoLock}>
                        <img src={require('../../Assets/images/ico/lock2.png')}/>
                    </div>
                    <input type="password" placeholder="请再次输入登录密码" className={login.input} onChange={this.inputPasswordSign2} onBlur={this.testPasswordMatch}/>
                    <div className={login.logoLock2}>
                        <img src={require('../../Assets/images/ico/lock2.png')}/>
                    </div>
                    <div className={login.loginBtn} onClick={this.submitForm}>SignUp</div>
                    <div className={login.bottomOptions}>
                        <div className={login.bottomOption} onClick={this.changeToLogin} style={{float: "right"}}>返回登录</div>
                    </div>
                </div>;
                break;
        }
    }

    inputUsernameSign(e) {
        let val = e.target.value;
        let data = Object.assign({}, this.state.signUpForm, { username: val })
        this.setState({
            signUpForm: data
        });
    }
    inputPasswordSign(e) {
        let val = e.target.value;
        //修改state对象
        let data = Object.assign({}, this.state.signUpForm, { password: val })
        this.setState({
            signUpForm: data
        });
    }
    inputPasswordSign2(e) {
        let val = e.target.value;
        //修改state对象
        let data = Object.assign({}, this.state.signUpForm, { repeatPassword: val })
        this.setState({
            signUpForm: data
        });
    }
    inputUsername(e) {
        let val = e.target.value;
        let data = Object.assign({}, this.state.loginForm, { username: val })
        this.setState({
            loginForm: data
        });
    }
    inputPassword(e) {
        let val = e.target.value;
        //修改state对象
        let data = Object.assign({}, this.state.loginForm, { password: val })
        this.setState({
            loginForm: data
        });
    }
    submitForm() {
        if(this.state.illegalPassword || this.state.illegalUsername){
            Message({
                message: "您的用户名或密码不符合条件！",
                type: "error"
            })
        } else {
            let data = new FormData();
            data.append("username", this.state.signUpForm.username);
            data.append("password", this.state.signUpForm.password);
            Axios.post(url+"/addUser", data)
                .then(response => {
                    if(response.data.status === -1){
                        Message({
                            message: response.data.msg,
                            type: 'error'
                        });

                    } else {
                        Message({
                            message: response.data.msg,
                            type: 'success'
                        })
                        setTimeout(()=>{
                            this.setState({
                                signUpForm: {
                                    username: "",
                                    password: "",
                                    repeatPassword: "",
                                }
                            });
                            this.changeToLogin();
                        }, 1000);
                    }

                }).catch(function (error) {
                    console.log(error);
                });
        }
    }
    login() {
        Axios.post(url+"/login", this.state.loginForm)
            .then(response => {
                console.log(response)
                if (response.status === 403) {
                    alert("用户名或密码错误", "请您重新输入")
                } else if (response.status === 200) {

                    Cookies.set('userId', response.data.userId)
                    Cookies.set('username', response.data.username)
                    Cookies.set('userType', response.data.userType)
                    console.log(window.history)
                    if(typeof (this.props.location.state)!="undefined"&&this.props.location.state.lastUrl){
                        window.history.back(-1)
                    }
                    this.props.history.push({pathname:'/'})
                } else if (response.data.data.userType === 2){
                    Message({
                        message: "您的账号已被管理员禁用，请联系管理员！",
                        type: "error"
                    })
                    return;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    testUsernameDuplicate(){
        let data = new FormData();
        data.append("username", this.state.signUpForm.username);
        Axios.post(url+"/checkUserDuplicate", data)
            .then(response => {
                console.log(response);
                if(response.data.status === -1){
                    Message({
                        message: response.data.msg,
                        type: 'error'
                    });
                    this.setState({
                        illegalUsername: true
                    })
                } else {
                    this.setState({
                        illegalUsername: false
                    })
                }
            }).catch(function (error) {
                console.log(error)
            });
    }
    testPasswordMatch(){
        if(this.state.signUpForm.repeatPassword !== this.state.signUpForm.password){
            Message({
                message: "两次输入的密码不一致！",
                type: 'error'
            });
            this.setState({
                illegalPassword : true
            })
        } else {
            this.setState({
                illegalPassword : false
            })
        }
    }

    render() {
        return (
            <div className={login.bg}>
                <div className={login.bg_mask}/>
                <div className={login.headerBox}>
                    <div className={login.imgBox}>
                        <img src={require('../../Assets/images/logo.png')}/>
                    </div>
                </div>
                <div className={login.mainBox}>
                    <div className={login.loginBox}>
                        {this.display()}
                    </div>
                </div>
            </div>
        )
    }
}
