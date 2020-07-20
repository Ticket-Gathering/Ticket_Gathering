import React, { Component } from 'react';
import SimpleNav from "./SimpleNav";
import ordConfSty from "./OrderConfirm.module.css"
import {Divider} from "antd";

const testData={time:'2020.08.02 周日 20:00' ,price:'188',name:'李荣浩2019「年少有为」巡回演唱会',showtime:'2020.08.01-2020.08.02' ,address:'上海市 | 珍珠剧场The Pearl ',ticketType:'电子票',faceValue:'成人票',num:3,img_url:require('../../Assets/images/poster1.jpg'),coupon:24}
export default class OrderConfirm extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:testData,
            total:0,
            payAmount:0
        }
    }
    componentDidMount() {
        this.setState({
            total:parseInt(this.state.data.price)*this.state.data.num,
        },()=>{this.setState({
            payAmount:this.state.total-this.state.data.coupon
        })})

    }

    render() {
        return (

            <div>
                <SimpleNav/>
                <div className={ordConfSty.container}>
                    <div className={ordConfSty.buyerInfoContainer}>

                    </div>

                    <div className={ordConfSty.tickerInfoContainer}>
                        <div className={ordConfSty.imgAndNameContainer}>
                            <div className={ordConfSty.imgContainer}>
                                <img src={this.state.data.img_url}/>
                            </div>
                            <div className={ordConfSty.nameContainer}>
                                <span>
                                    {this.state.data.name}
                                </span>
                            </div>
                        </div>
                        <Divider/>
                        <div className={ordConfSty.basicInfoContainer}>
                            <span>
                                票面：
                                <span className={ordConfSty.gray}>
                                    {this.state.data.price}
                                    <Divider type={'vertical'}/>
                                    {this.state.data.faceValue}
                                </span>
                            </span>
                            <span>
                                地点：
                                <span className={ordConfSty.gray}>
                                    {this.state.data.address}
                                </span>
                            </span>
                            <span>
                                时间：
                                <span className={ordConfSty.gray}>
                                    {this.state.data.time}
                                </span>
                            </span>
                            <span>
                                数量：
                                <span className={ordConfSty.gray}>
                                    {this.state.data.num}&nbsp;张
                                </span>
                            </span>
                        </div>
                        <Divider/>
                        <div className={ordConfSty.basicInfoContainer} >
                            <span>
                               票款：
                                <span className={ordConfSty.gray+' '+ordConfSty.rightAlign}>
                                    {this.state.total}元
                                </span>
                            </span>
                            <span>
                               优惠/抵用：
                                <span className={ordConfSty.red+' '+ordConfSty.rightAlign}>
                                    -{this.state.data.coupon}元
                                </span>
                            </span>
                            <span>
                               订单总额：
                                <span className={ordConfSty.gray+' '+ordConfSty.rightAlign}>
                                    {this.state.payAmount}元
                                </span>
                            </span>
                        </div>
                        <Divider/>
                        <div className={ordConfSty.basicInfoContainer}>
                             <span>
                                实付款：
                                <span className={ordConfSty.red+' '+ordConfSty.rightAlign} style={{fontSize:18+'px'}}>
                                    {this.state.payAmount.toFixed(2)}元
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
