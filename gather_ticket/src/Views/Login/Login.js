import React, { Component } from 'react'
import login from './Login.module.css';
import { Link } from 'react-router-dom';
import Bottom from "../../Components/Bottom";
import Axios from '../../Module/Axios'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginCard: true,
            signUpCard: false,
            curTab: 1,
            signUpForm: {
                account: "",
                passwd: ""
            },
            loginForm: {
                account: "",
                passwd: ""
            },
        };
        this.changeToLogin = this.changeToLogin.bind(this);
        this.changeToSignUp = this.changeToSignUp.bind(this);
        this.inputUsernameSign = this.inputUsernameSign.bind(this);
        this.inputPasswordSign = this.inputPasswordSign.bind(this);
        this.inputUsername = this.inputUsername.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.login = this.login.bind(this);
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
                    <input type="text" placeholder="请输入手机号或邮箱" className={login.input} onChange={this.inputUsername}/>
                    <div className={login.logoUsr}>
                        <img src={require('../../Assets/images/ico/user2.png')}/>
                    </div>
                    <input type="password" placeholder="请输入登录密码" className={login.input} onChange={this.inputPassword}/>
                    <div className={login.logoLock}>
                        <img src={require('../../Assets/images/ico/lock2.png')}/>
                    </div>
                    <div className={login.loginBtn} onClick={this.login}>LOGIN</div>
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
                    <input type="text" placeholder="请输入手机号或邮箱" className={login.input} onChange={this.inputUsernameSign}/>
                    <div className={login.logoUsr}>
                        <img src={require('../../Assets/images/ico/user2.png')}/>
                    </div>
                    <input type="password" placeholder="请输入登录密码" className={login.input} onChange={this.inputPasswordSign}/>
                    <div className={login.logoLock}>
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
        let data = Object.assign({}, this.state.signUpForm, { account: val })
        this.setState({
            signUpForm: data
        });
    }
    inputPasswordSign(e) {
        let val = e.target.value;
        //修改state对象
        let data = Object.assign({}, this.state.signUpForm, { passwd: val })
        this.setState({
            signUpForm: data
        });
    }
    inputUsername(e) {
        let val = e.target.value;
        let data = Object.assign({}, this.state.loginForm, { account: val })
        this.setState({
            loginForm: data
        });
    }
    inputPassword(e) {
        let val = e.target.value;
        //修改state对象
        let data = Object.assign({}, this.state.loginForm, { passwd: val })
        this.setState({
            loginForm: data
        });
    }
    submitForm() {
        Axios.post("/user/reg", this.state.signUpForm)
            .then(response => {
                if (response.data.msg === "account_already_exist") {
                    alert("账号名已存在，请您重新注册")
                } else if (response.data.msg === "reg_success") {
                    alert("恭喜您注册成功，请登录享受更好的体验~");
                    let da = this.state.signUpForm;
                    this.setState({
                        loginForm: da
                    });
                    this.changeStyle();

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    login() {
        Axios.post("/user/login", this.state.loginForm)
            .then(response => {
                if (response.data.msg === "account_no_exist") {
                    alert("账号不存在", "请您先注册")
                } else if (response.data.msg === "false password") {
                    alert("密码错误", "请您重新输入密码")
                } else if (response.data.msg === "login_success") {
                    this.props.history.push('/self', null);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
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
