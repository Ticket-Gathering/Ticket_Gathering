import React, { Component } from 'react'
import liststyle from './NavList.module.css'
import { Link } from 'react-router-dom';

export default class NavList extends Component {
    render() {
        return (
            <div className={liststyle.father}>
                <div className={liststyle.son} data-cy={'演唱会'}>
                    <Link to={
                            {pathname:"/page",
                            state:{type:`演唱会`,city:this.props.cityValue}}
                          }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/vocal.png')} alt="定位图片"/>
                        </div>
                        <span className={liststyle.sontext}>演唱会</span>
                    </Link>
                </div>
                <div className={liststyle.son} data-cy={'话剧歌剧'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`话剧歌剧`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/drama.png')} />
                        </div>
                        <span className={liststyle.sontext}>话剧歌剧</span>
                    </Link>
                </div>
                <div className={liststyle.son} data-cy={'体育'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`体育`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/sports.png')} />
                        </div>
                        <span className={liststyle.sontext}>体育</span>
                    </Link>
                </div>
                <div className={liststyle.son} data-cy={'儿童亲子'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`儿童亲子`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/children.png')} />
                        </div>
                        <span className={liststyle.sontext}>儿童亲子</span>
                    </Link>
                </div>
                <div className={liststyle.son} data-cy={'展览休闲'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`展览休闲`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/img.png')}/>
                        </div>
                        <span className={liststyle.sontext}>展览休闲</span>
                    </Link
                        >
                </div>
                <div className={liststyle.son}  data-cy={'音乐会'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`音乐会`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/concert.png')} />
                        </div>
                    </Link>
                    <span className={liststyle.sontext}>音乐会</span>
                </div>
                <div className={liststyle.son} data-cy={'曲苑杂坛'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`曲苑杂坛`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/opera.png')}/>
                        </div>
                    </Link>
                    <span className={liststyle.sontext}>曲苑杂坛</span>
                </div>
                <div className={liststyle.son} data-cy={'舞蹈芭蕾'}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`舞蹈芭蕾`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/ballet.png')}/>
                        </div>
                        <span className={liststyle.sontext}>舞蹈芭蕾</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`二次元`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/cartoon.png')} />
                        </div>
                        <span className={liststyle.sontext}>二次元</span>
                    </Link>
                </div>
                <div className={liststyle.son}>
                    <Link to={
                        {pathname:"/page",
                            state:{type:`旅游展览`,city:this.props.cityValue}}
                    }>
                        <div className={liststyle.sonimg}>
                            <img src={require('../ImgAssets/travel.png')}/>
                        </div>
                        <span className={liststyle.sontext}>旅游展览</span>
                    </Link>
                </div>
            </ div>
        )
    }
}
