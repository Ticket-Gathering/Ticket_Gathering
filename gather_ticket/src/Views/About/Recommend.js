import React, { Component } from 'react'
import recommend from "./Recommend.module.css";
import about from "./About.module.css";
import Axios from "../../Module/Axios";

const url = "http://localhost:8080"
export default class Recommend extends Component{
    constructor(props) {
        super(props)
        this.state = {
            recmdList:[{venue:{},category:{}}],
        }
    }
    componentDidMount()
     {
         Axios.get(url+"/recommendByCategory/"+this.props.subCategory)
             .then(response => {
                 this.setState({
                     recmdList:response.data
                 })
             }).catch(err => {
             console.log(err);
         })
    }
    goAbout(id){
        this.props.goAbout(id);
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
                {this.state.recmdList.map((item, index) => {
                    return(
                        <div className={recommend.itemBox} onClick={this.goAbout.bind(this, item.showId)}>
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