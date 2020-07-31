import React, { Component } from 'react';
import posters from './homePoster.module.css';
import Axios from '../../Module/Axios';
import Poster from "./posterItem";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

class HomePoster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstPoster:{venue:{}},
            posterData:[],
            cityValue:this.props.cityValue
        }
        this.goAbout = this.goAbout.bind(this)
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.posterData&&nextProps.posterData.length>1) {
            this.setState({
                firstPoster: nextProps.posterData[0],
                posterData: nextProps.posterData.splice(1, 7),
            })
        }
        this.setState({
            cityValue:nextProps.cityValue
        })
    }

    goAbout(){
        let i = this.state.firstPoster.showId;
        this.props.history.push({ pathname: "/about" + `/${i}` })
    }

    render() {
        return (
            <div className={posters.posters} data-cy={this.props['data-cy']}>
                <div className={posters.posterTitle}>
                    <div className={posters.pTitleCategory}>{this.props.title}</div>
                    <div className={posters.pTitleMore}>
                        <Link to={{pathname:'/page',state:{type:this.props.title,city:this.state.cityValue}}}
                            style={{color:'lightgray'}}
                              data-cy={'more'}
                        >
                            查看全部
                        </Link>
                    </div>
                </div>
                <div className={posters.posterBody}>
                    <div className={posters.firstPosterContainer} onClick={this.goAbout} data-cy={'firstPoster'}>
                        <img src={this.state.firstPoster.img_url} className={posters.firstPosterImg} />
                        <div className={posters.firstPosterDetail}>
                            <div className={posters.firstPosterName}>{this.state.firstPoster.name}</div>
                            <div className={posters.firstPosterAddress}>{this.state.firstPoster.venue.venuename}</div>
                            <div className={posters.firstPosterTime}>{this.state.firstPoster.show_time}</div>
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
                                return <Poster poster={item} key={this.props.title+index} data-cy={`${this.props.title}:poster:${index}`}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HomePoster)
