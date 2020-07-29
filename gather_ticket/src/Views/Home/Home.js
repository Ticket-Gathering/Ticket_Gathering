import React, { Component } from 'react'
import Nav from "../../Components/Nav";
import Notable from "../../Components/Notable";
import HomePoster from "./homePoster";
import NavList from "../../Components/NavList";
import Bottom from "../../Components/Bottom";
import Axios from "../../Module/Axios";
const url = "http://localhost:8080";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posterData:[],
            cityValue:'全国'
        };
        this.showSwiper = this.showSwiper.bind(this);
    }

    componentDidMount() {
        Axios.get(url+"/show/getHomePage").then(res=>{
            // console.log(res.data)
            this.setState({
                posterData:res.data
            })
        })
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
                <HomePoster data-cy={'homePoster:演唱会'} title={"演唱会"} posterData={this.state.posterData[1]} cityValue={this.state.cityValue} />
                <HomePoster data-cy={'homePoster:话剧歌剧'} title={"话剧歌剧"} posterData={this.state.posterData[3]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:体育'} title={"体育"} posterData={this.state.posterData[6]} cityValue={this.state.cityValue} />
                <HomePoster data-cy={'homePoster:儿童亲子'} title={"儿童亲子"} posterData={this.state.posterData[0]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:展览休闲'} title={"展览休闲"} posterData={this.state.posterData[7]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:音乐会'} title={"音乐会"} posterData={this.state.posterData[2]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:曲苑杂坛'} title={"曲苑杂坛"} posterData={this.state.posterData[5]} cityValue={this.state.cityValue}/>
                <HomePoster data-cy={'homePoster:舞蹈芭蕾'} title={"舞蹈芭蕾"} posterData={this.state.posterData[4]} cityValue={this.state.cityValue}/>
                <Bottom/>
            </div>
        )
    }
}
