import React, { Component } from 'react'
import recommend from "./Recommend.module.css";
import about from "./About.module.css";
import Axios from "../../Module/Axios";
import {url} from "../../Constants/constants"

export default class Recommend extends Component{
    constructor(props) {
        super(props)
        this.state = {
            recmdList:[],
        }
    }
    componentDidMount()
     {
         let keywords = this.props.keywords.split(" ");
         let num = keywords.length;
         let i = 0;
         console.log(keywords);
         while( i < keywords.length){
             if(this.state.recmdList.length >= 6) break;
             let data = new FormData();
             data.append("keyword", keywords[i]);
             Axios.post(url+"/show/recommendByKeyword/", data)
                 .then(response => {
                     let tmpList = this.state.recmdList;
                     this.setState({
                         recmdList:tmpList.concat(response.data)
                     })
                 }).catch(err => {
                 console.log(err);
             })
             i++;
         }
    }
    goAbout(item){
        console.log(item.platform);
        this.props.goAbout(item.showId, item.platform);
    }

    render() {
        return(
            <div className={recommend.recmdList}>
                <div style={{width:"100%"}}>
                    <div className={recommend.sectionTitle}>
                        <div className={about.subtitle}>为您推荐</div>
                        <div className={about.line}/>
                    </div>
                </div>
                {this.state.recmdList.slice(0,6).map((item, index) => {
                    return(
                        <div className={recommend.itemBox} onClick={this.goAbout.bind(this, item)}>
                            <div className={recommend.poster}>
                                <img src={item.img_url}/>
                            </div>
                            <div className={recommend.showInfo}>
                                <h6 className={recommend.category}>{item.category.category}</h6>
                                <h4 className={recommend.title}>{item.name}</h4>
                                <h6 className={recommend.info}>
                                    {item.city}|{item.venue.venuename}<br/>
                                    {item.show_time}<br/>
                                </h6>
                                <h3 className={recommend.price}>￥{item.price_low}+</h3>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}