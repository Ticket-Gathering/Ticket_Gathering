import React, { Component } from 'react';
import posters from './homePoster.module.css';
import Axios from '../../Module/Axios';
import Poster from "./posterItem";
import {Link} from "react-router-dom";

export default class HomePoster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // dataone: { pricelist: [{}] }
            firstPoster:{},
            posterData:[],
            type:this.props.typeID,
            cityValue:this.props.cityValue
        }
    }


    componentWillReceiveProps(nextProps, nextContext){
        // Axios.get("/home/getposters").then(res => {
        //     res.data[0].pricelist = JSON.parse(res.data[0].pricelist)
        //     this.setState({
        //         data: res.data.splice(1, res.data.length - 1),
        //         dataone: res.data[0]
        //     })
        // })
        //     .catch(err => {
        //         console.log(err);
        //     })
        console.log(nextProps.posterData)
        if(nextProps.posterData.length>1) {
            this.setState({
                firstPoster: nextProps.posterData[0],
                posterData: nextProps.posterData.splice(1, 7),
            })
        }
    }

    render() {
        return (
            <div className={posters.posters} >
                <div className={posters.posterTitle}>
                    <div className={posters.pTitleCategory}>{this.props.title}</div>
                    <div className={posters.pTitleMore}>
                        <Link to={{pathname:'/page',state:{typeID:this.state.type,cityID:this.state.cityValue}}}
                            style={{color:'lightgray'}}
                        >
                            查看全部
                        </Link>
                    </div>
                </div>
                <div className={posters.posterBody}>
                    <div className={posters.firstPosterContainer}>
                        <img src={this.state.firstPoster.img_url} className={posters.firstPosterImg} />
                        <div className={posters.firstPosterDetail}>
                            <div className={posters.firstPosterName}>{this.state.firstPoster.name}</div>
                            <div className={posters.firstPosterName}>
                                <span style={{fontSize:24+'px'}}>
                                    ￥
                                    {this.state.firstPoster.price_low}
                                </span>
                                起
                            </div>
                        </div>
                    </div>
                    <div className={posters.posterItem}>
                        {
                            this.state.posterData.map((item,index)=>{
                                return <Poster poster={item} key={index}></Poster>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
