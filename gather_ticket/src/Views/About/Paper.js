import React, { Component } from 'react'
import paper from "./Paper.module.css";
import {Divider} from "antd";

export default class Paper extends Component {
    constructor(props) {
        super(props)
    }

    sSet(i) {
        console.log(i);
        if (i === 0) {
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-seat.png")}/><div className={paper.tag}>可选座</div></div>
                <div className={paper.text}>本项目支持自主选座1. 选择演出时间，并点击“选座购票”进入选座页面2. 选座后，在15分钟内支付成功，选座生效*先付后选的项目需要先付款，到开放选座的日期我们会短信通知，请注意查收</div>
            </div>
        }
        if (i === 1){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-seat-no.png")}/><div className={paper.tag}>不支持选座</div></div>
                <div className={paper.text}>本项目不支持自主选座，同一个订单优先连座</div>
            </div>
        }
    }

    sTicket(i) {
        if (i === 0){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-ticket.png")}/><div className={paper.tag}>自助取票</div></div>
                <div className={paper.text}>自助取票：需要您在指定的取票地点取票，下单后可通过票夹中的二维码或身份证换取纸质票（具体以下单后票夹信息为准）</div>
            </div>
        }
        if (i === 1){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-express.png")}/><div className={paper.tag}>快递票</div></div>
                <div className={paper.text}>快递票：纸质票会在开票后快递到您留下的收货地址，需您承担邮寄费用。注：离开演时间仅4天时，不再寄送快递票，支持在指定取票地点取票（具体以下单后票夹信息为准）</div>
            </div>
        }
        if (i === 2){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-express.png")}/><div className={paper.tag}>自助取票 快递票</div></div>
                <div className={paper.text}>自助取票：需要您在指定的取票地点取票，下单后可通过票夹中的二维码或身份证换取纸质票（具体以下单后票夹信息为准）</div>
                <div className={paper.text}>快递票：纸质票会在开票后快递到您留下的收货地址，需您承担邮寄费用。注：离开演时间仅4天时，不再寄送快递票，支持在指定取票地点取票（具体以下单后票夹信息为准）</div>
            </div>
        }
        if (i === 3){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-2D.png")}/><div className={paper.tag}>电子票</div></div>
                <div className={paper.text}>电子票：通过票夹中的二维码或身份证，可以直接验票入场（具体以下单后票夹信息为准）</div>
            </div>
        }
    }

    sInv(i) {
        if (i === 0){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-bill.png")}/><div className={paper.tag}>纸质发票</div></div>
                <div className={paper.text}>该项目支持开具纸质发票，请您在演出开始前通过订单页补开，发票将在演出结束后1个月左右，统一由主办方提供</div>
            </div>
        }
        if (i === 1){
            return <div className={paper.info}>
                <div className={paper.title}><img className={paper.icon} src={require("../../Assets/images/ico/line-message.png")}/><div className={paper.tag}>电子发票</div></div>
                <div className={paper.text}>该项目支持开具电子发票。该发票由第三方主办提供，需要在演出开始前提交发票申请，一般演出结束后1个月左右开具</div>
            </div>
        }
    }

    render() {
        return (
            <div className={paper.paper}>
                <div>{this.sSet(this.props.paper.chooice)}</div>
                <Divider/>
                <div>{this.sTicket(this.props.paper.getter)}</div>
                <Divider/>
                <div>{this.sInv(this.props.paper.type)}</div>
            </div>
        )
    }
}
