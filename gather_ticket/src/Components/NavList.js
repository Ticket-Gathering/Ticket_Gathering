import React, { Component } from 'react'
import liststyle from './NavList.module.css'
import { Link } from 'react-router-dom';

export default class NavList extends Component {
    render() {
        return (
            <div className={liststyle.father}>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/vocal.png')} alt="定位图片"></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">演唱会</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/drama.png')} ></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">话剧歌剧</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/sports.png')} ></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">体育</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/children.png')} ></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">儿童亲子</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/img.png')}></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">展览休闲</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/concert.png')} ></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">音乐会</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/opera.png')}></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">曲苑杂坛</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/ballet.png')}></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">舞蹈芭蕾</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/cartoon.png')} ></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">二次元</Link></span>
                </div>
                <div className={liststyle.son}>
                    <div className={liststyle.sonimg}>
                        <img src={require('../ImgAssets/travel.png')}></img>
                    </div>
                    <span className={liststyle.sontext}><Link to="/page">旅游展览</Link></span>
                </div>
            </ div>
        )
    }
}
