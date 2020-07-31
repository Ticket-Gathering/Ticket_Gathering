import React, { Component } from 'react';
import pagePoster from './PageItem.module.css';
import { withRouter } from 'react-router-dom';
import {Tag} from "antd";

class Poster extends Component {
    constructor(props) {
        super(props)
        this.goAbout = this.goAbout.bind(this);
    }

    goAbout() {
        console.log(this.props.poster)
        let i = this.props.poster.showId;
        this.props.history.push({ pathname: "/about" + `/${i}` })
    }

    render() {
        switch (this.props.poster.show_status) {
            case 1:
                var statusTag=<Tag color="red">售票中</Tag>
                break
            case 2:
                var statusTag=<Tag color={"orange"}>退票中</Tag>
                break
            default:
                var statusTag=<Tag color={"darkgrey"}>未开售</Tag>
                break
        }
        let typeText=''
        switch (this.props.poster.category) {
            case 0:
                typeText='儿童亲子'
                break
            case 1:
                typeText='演唱会'
                break
            case 2:
                typeText='音乐会'
                break
            case 3:
                typeText='话剧歌剧'
                break
            case 4:
                typeText='舞蹈芭蕾'
                break
            case 5:
                typeText='曲苑杂坛'
                break
            case 6:
                typeText='体育'
                break
            case 7:
                typeText='展览休闲'
                break;
            default:
                break
        }
        return (
            <div className={pagePoster.showContainer} data-cy={this.props['data-cy']}>
                <div className={pagePoster.showImgContainer} onClick={this.goAbout} data-cy={'pageItem-goodsImg'}>
                    <img src={this.props.poster.img_url} className={pagePoster.showImg}/>
                    <Tag className={pagePoster.showType} color={'#e62958'} data-cy={'pageItem-type'}>{this.props.poster.category.category}</Tag>
                </div>

                <div className={pagePoster.infContainer}>
                    <div className={pagePoster.detailContainer}>
                        <div className={pagePoster.name} data-cy={'pageItem-name'}>{this.props.poster.name}</div>

                        <div className={pagePoster.horizontal}>
                            <img className={pagePoster.smallImg} src={require('../../ImgAssets/location.png')}/>
                            <div className={pagePoster.showDetail} data-cy={'pageItem-city'}>{this.props.poster.city} | {this.props.poster.venue.venuename}</div>
                        </div>

                        <div className={pagePoster.horizontal}>
                            <img className={pagePoster.smallImg} src={require('../../ImgAssets/calendar.png')}/>
                            <div className={pagePoster.showDetail}>{this.props.poster.show_time}</div>
                        </div>

                        <div className={pagePoster.horizontal}>
                            {statusTag}
                        </div>

                    </div>
                    <div>
                        <div className={pagePoster.price}>
                        <span style={{fontSize:28+'px'}}>
                            ￥{this.props.poster.price_low}
                        </span>
                            起
                        </div>
                        <div className={pagePoster.srcWebContainer}>
                            <img className={pagePoster.srcWebImg+(this.props.poster.platform==='永乐票务'?' '+pagePoster.srcWebImgSelected:'')} src={require('../../ImgAssets/logo-y.jpg')}/>
                            <img className={pagePoster.srcWebImg+(this.props.poster.platform==='摩天轮'?' '+pagePoster.srcWebImgSelected:'')} src={require('../../ImgAssets/logo-m.jpg')}/>
                            <img className={pagePoster.srcWebImg+(this.props.poster.platform==='大麦网'?' '+pagePoster.srcWebImgSelected:'')} src={require('../../ImgAssets/logo-d.png')}/>
                            <div className={pagePoster.srcWebText}>
                                <span>票 源: {this.props.poster.platform}</span>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        )
    }
}
export default withRouter(Poster);
