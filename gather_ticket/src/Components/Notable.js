import React, { Component } from 'react'
import notablestyle from './Notable.module.css'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

export default class Notable extends Component {
    render() {
        return (
            <div className={notablestyle.father}>
                <div className={notablestyle.son}>
                    <Carousel autoplay>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home1.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home2.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home3.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home4.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home5.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../ImgAssets/testCarousel/home6.jpg')}></img>
                        </div>
                    </Carousel>

                </div>
            </div>
        )
    }
}
