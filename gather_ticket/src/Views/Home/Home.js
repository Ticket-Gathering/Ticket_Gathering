import React, { Component } from 'react'
import Nav from "../../Components/Nav";
import Notable from "../../Components/Notable";
import HomePoster from "./homePoster";
import NavList from "../../Components/NavList";
import Bottom from "../../Components/Bottom";
import Axios from "../../Module/Axios";
import {url} from "../../Constants/constants"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posterData:[],
            cityValue:'全国',
            fetchTime: 0
        };
        this.showSwiper = this.showSwiper.bind(this);
        this.bindScroll = this.bindScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.bindScroll)
        let fetchTime = this.state.fetchTime;
        Axios.get(url+"/show/getHomePage/"+fetchTime).then(res=>{
            console.log(res.data);
            let posterData = this.state.posterData;
            fetchTime = fetchTime + 1;
            res.data.forEach(data => posterData.push(data))
            this.setState({
                posterData:posterData,
                fetchTime: fetchTime
            })
        })
    }

    componentWillUnmount() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.bindScroll);
    }

    bindScroll(event){
        if(this.state.fetchTime >= 4) return;
        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
        const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
        const height = scrollHeight - scrollTop - clientHeight;

        // console.log("scrollTop: " + scrollTop);
        // console.log("clientHeight: " + clientHeight);
        // console.log("scrollHeight: " + scrollHeight);
        console.log("height: " + height);

        if(height <= 400) {
            let fetchTime = this.state.fetchTime;
            Axios.get(url+"/show/getHomePage/"+fetchTime).then(res=>{
                console.log(res.data);
                let posterData = this.state.posterData;
                fetchTime = fetchTime + 1;
                res.data.forEach(data => posterData.push(data))
                this.setState({
                    posterData: posterData,
                    fetchTime: fetchTime
                })
            })
        }
        // 判断距离页面底部的高度
        // if (height <= (this.props.num || 0)) {
        //     // 判断执行回调条件
        //     if (this.state.codeType) {
        //         // 执行回调
        //         this.props.scrollCallback();
        //         // 关闭判断执行开关
        //         this.setState(
        //             {
        //                 codeType: false,
        //             }
        //         );
        //     }
        // } else {
        //     // 打开判断执行开关
        //     this.setState({
        //         codeType: true
        //     });
        // }
    }

    showSwiper(ev) {
        this.setState({
            data: ev.target.ad
        })
    }


    render() {
        return (
            <div>
                <Nav setCityValue={(newV) => this.setState({cityValue:newV})} history={this.props.history} pageIdent="home"/>
                <NavList cityValue={this.state.cityValue} />
                <Notable/>
                <HomePoster data-cy={'homePoster:儿童亲子'} title={"儿童亲子"} posterData={this.state.posterData[0]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:演唱会'} title={"演唱会"} posterData={this.state.posterData[1]} cityValue={this.state.cityValue} />
                { this.state.fetchTime >= 1?
                    <div>
                        <HomePoster data-cy={'homePoster:音乐会'} title={"音乐会"} posterData={this.state.posterData[2]} cityValue={this.state.cityValue}/>
                        <HomePoster data-cy={'homePoster:话剧歌剧'} title={"话剧歌剧"} posterData={this.state.posterData[3]} cityValue={this.state.cityValue}/>
                    </div> : <div/>
                }

                { this.state.fetchTime >= 2?
                    <div>
                        <HomePoster data-cy={'homePoster:舞蹈芭蕾'} title={"舞蹈芭蕾"} posterData={this.state.posterData[4]} cityValue={this.state.cityValue}/>
                        <HomePoster data-cy={'homePoster:曲苑杂坛'} title={"曲苑杂坛"} posterData={this.state.posterData[5]} cityValue={this.state.cityValue}/>
                    </div> : <div/>
                }

                { this.state.fetchTime >= 3?
                    <div>
                        <HomePoster data-cy={'homePoster:体育'} title={"体育"} posterData={this.state.posterData[6]} cityValue={this.state.cityValue} />
                        <HomePoster data-cy={'homePoster:展览休闲'} title={"展览休闲"} posterData={this.state.posterData[7]} cityValue={this.state.cityValue}/>
                    </div> : <div/>
                }
                <Bottom/>
            </div>
        )
    }
}
