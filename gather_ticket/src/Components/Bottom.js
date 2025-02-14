import React, { Component } from 'react'
import bottom from './Bottom.module.css'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';

export default class Bottom extends Component {
    render() {
        return (
            <div className={bottom.father}>
                <div className={bottom.son}>
                    <Carousel autoplay>
                        <div>
                            <img src={require('../Assets/images/1.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../Assets/images/2.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../Assets/images/3.jpg')}></img>
                        </div>
                        <div>
                            <img src={require('../Assets/images/4.jpg')}></img>
                        </div>
                    </Carousel>

                </div>
            </div>
        )
    }
}
