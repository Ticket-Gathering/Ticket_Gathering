import React, { Component } from 'react'
import liststyle from './NavList.module.css'
import { Link } from 'react-router-dom';

export default class NavList extends Component {
    render() {
        return (
            <div className={liststyle.father}>
                <div className={liststyle.son}>
                    <Link to={
                            {pathname:"/page",
                            state:{typeID:`1`,cityID:this.props.cityValue}}
                          }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/vocal.png')} alt="定位图片"></img>
                        </div>
                        <span className={liststyle.sontext}>演唱会</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`2`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/drama.png')} ></img>
                        </div>
                        <span className={liststyle.sontext}>话剧歌剧</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`3`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/sports.png')} ></img>
                        </div>
                        <span className={liststyle.sontext}>体育</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`4`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/children.png')} ></img>
                        </div>
                        <span className={liststyle.sontext}>儿童亲子</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`5`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/img.png')}></img>
                        </div>
                        <span className={liststyle.sontext}>展览休闲</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`6`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/concert.png')} ></img>
                        </div>
                    </Link>
                    <span className={liststyle.sontext}>音乐会</span>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`7`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/opera.png')}></img>
                        </div>
                    </Link>
                    <span className={liststyle.sontext}>曲苑杂坛</span>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`8`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/ballet.png')}></img>
                        </div>
                        <span className={liststyle.sontext}>舞蹈芭蕾</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`0`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/cartoon.png')} ></img>
                        </div>
                        <span className={liststyle.sontext}>二次元</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{typeID:`0`,cityID:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/travel.png')}></img>
                        </div>
                        <span className={liststyle.sontext}>旅游展览</span>
                    </Link>
                </div>
            </ div>
        )
    }
}
