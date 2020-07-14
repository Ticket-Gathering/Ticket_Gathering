import React, { Component } from 'react';
import Nav from "../../Components/Nav";
import AboutItem from "./AboutItem";
import Paper from "./Paper";
import about from "./About.module.css";
import Poster from "../../Components/Poster";
import Axios from "../../Module/Axios";
import Bottom from "../../Components/Bottom";

const Data = {timelist:['2020.08.01 周六 20:00','2020.08.02 周日 20:00' ],pricelist:['100','120','188'],billtype:{chooice:1,getter:1,type:1},name:'李荣浩2019「年少有为」巡回演唱会',showtime:'2020.08.01-2020.08.02' ,address:'上海市 | 珍珠剧场The Pearl '};

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { timelist: [], pricelist: [], billtype: {}, imgurl: '../../Assets/images/poster1.jpg',name:'',showtime:'',address:'' },
            introduce: []
        }

    }
    componentDidMount() {
        // let i = this.props.match.params.aid;
        // Axios.get("/about/getAbout", { params: { aid: i } }).then((res) => {
        //     res.data[0].timelist = JSON.parse(res.data[0].timelist);
        //     res.data[0].pricelist = JSON.parse(res.data[0].pricelist);
        //     res.data[0].billtype = JSON.parse(res.data[0].billtype);
        //     console.log(res.data[0]);
        //     this.setState({
        //         data: res.data[0]
        //     });
        //     this.getIntroduce(res.data[0].address);
        // })
        //     .catch(err => {
        //         console.log(err);
        //     })
        this.setState({data:Data});
    }

    // getIntroduce() {
    //     let i = this.state.data.address;
    //     console.log(i);
    //     Axios.get("/about/getIntroduce", {
    //         params:
    //             { address: i }
    //     }).then((res) => {
    //         this.setState({
    //             introduce: res.data
    //         })
    //     })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    render() {
        return (
            <div className={about.about}>
                <Nav pageIdent="page"/>
                <div className={about.base}>
                    <div className={about.briefInfo}>
                            <div className={about.showInfo}>
                                <AboutItem aboutitem={this.state.data}/>
                            </div>
                            <div className={about.ticketInfo}>
                                <Paper paper={this.state.data.billtype}/>
                            </div >
                    </div>
                    <div style={{paddingBottom: "10px"}}>
                        <div className={about.subNavs}>
                            <div className={about.subNav}>
                                <a href="#xmxq">项目详情</a>
                            </div>
                            <div className={about.subNav}>
                                <a href="#gpxz">购票须知</a>
                            </div>
                            <div className={about.subNav}>
                                <a href="#gyxz">观演须知</a>
                            </div>
                        </div>
                        <div className={about.showDetails} id="xmxq">
                            <div className={about.subtitle}>温馨提示</div>
                            <div className={about.line}/>
                            <span className={about.detailText}>本项目不支持使用优惠券购票，敬请理解</span>
                            <div className={about.subtitle}>演出介绍</div>
                            <div className={about.line}/>
                            <div className={about.detailText}>他说，做音乐是件很帅的事情。</div>
                            <img src={require('../../Assets/images/li.webp')} className={about.img}/>
                            <div className={about.detailText}>自2013年出道以来，李荣浩专注音乐潜心创作，一年一张专辑的频率被誉为"音乐圈劳模"，而2018年新专辑《耳朵》一经推出就取得了相当可观的成绩，多首歌曲长期处于"霸榜"状态，亿万播放量更是霸气成各大榜单赢家。而在互联网时代，数字单曲是大趋势的情况下，李荣浩一直坚持做实体专辑，不随波逐流，用自己的脚踏实地去回报音乐，致敬音乐。
                                    一年一张专辑，一年几首HitSong，已然成了李荣浩发片常态。前几张专辑里，经典曲目层出不穷，其代表作就有《模特》《李白》《老街》《不将就》《喜剧之王》《作曲家》《戒烟》等，成众多人歌单里的单曲循环，素有百听不厌之势。如果说首专是李荣浩音乐生涯的一座高峰，那2018年新专辑《耳朵》就是其职业生涯的另一座高峰，引发全民狂欢的《贝贝》，同名大热主打歌《耳朵》，刮起复古都市风的《王牌冤家》，以及引发群体共鸣的《成长之重量》，都为成就这张"神专"添砖加瓦，而网络爆款《年少有为》则为这张专辑添了浓墨重彩的一笔，直戳亿万网友内心，让每一个有故事的人珍惜身边所拥有的。</div>
                            <img src={require('../../Assets/images/li1.webp')} className={about.img}/>
                            <div className={about.detailText}>李荣浩2019「年少有为」巡回演唱会
                                    李荣浩「年少有为」巡回演唱会于2019年3月16日上海正式开跑，这也是继「天生李荣浩亚洲巡回演唱会」和「李荣浩有理想世界巡回演唱会」之后，职业生涯的第三轮巡演，也是第五张专辑发行后众多新歌首秀舞台，当然，前几张专辑的经典曲目也将进行重新编曲再演绎，争取让歌迷们享受到一次全新的音乐之旅。
                                    作为本次演唱会的总导演之一及总策划，李荣浩事事亲力亲为，严格把关各个关卡，从主视觉海报拍摄、到曲目编排，再到舞美灯光，事无巨细，极尽所能做好最好，意在给歌迷一个独特的演唱会体验，这无疑不体现对于本次巡演重视之程度。而以「年少有为」作为本次巡演的主题，也是希望大家能够珍惜身边所有，不负热望。</div>
                            <img src={require('../../Assets/images/li2.webp')} className={about.img}/>
                        </div>
                        <div className={about.showDetails} id="gpxz">
                            <div className={about.subtitle}>购票须知</div>
                            <div className={about.line}/>
                            <div className={about.tipTitle}>限购说明</div>
                            <div className={about.tip}>每个账号最多购买4张</div>
                            <div className={about.tipTitle}>实名制</div>
                            <div className={about.tip}>购买时您需要输入购票人身份证信息，每笔订单对应一个证件号</div>
                            <div className={about.tipTitle}>配送信息说明</div>
                            <div className={about.tip}>本项目不支持修改配送地址，请务必在下单前检查好您的收货地址</div>
                            <div className={about.tipTitle}>儿童购票说明</div>
                            <div className={about.tip}>1.2米以上凭成人票入场，1.2米以下谢绝入场</div>
                            <div className={about.tipTitle}>座位类型</div>
                            <div className={about.tip}>请按门票对应位置，有序对号入座</div>
                            <div className={about.tipTitle}>发票说明</div>
                            <div className={about.tip}>如需发票，请您在演出开始前通过订单页补开，发票将在演出结束后1个月左右，统一由开具方提供</div>
                            <div className={about.tipTitle}>退换政策</div>
                            <div className={about.tip}>票品不支持退换票。如无法正常观看，还请自行处理，给您带来不便敬请谅解</div>
                            <div className={about.tipTitle}>演出时长</div>
                            <div className={about.tip}>演出时长以现场为准</div>
                            <div className={about.tipTitle}>异常订购说明</div>
                            <div className={about.tip}>对于异常订购行为，大麦网有权在订单成立或者生效之后取消相应订单。异常订购行为包括但不限于以下情形： （1）通过同一ID订购超出限购张数的订单； （2）经合理判断认为非真实消费者的下单行为，包括但不限于通过批量相同或虚构的支付账号、收货地址（包括下单时填写及最终实际收货地址）、收件人、电话号码订购超出限购张数的订单</div>
                        </div>
                        <div className={about.showDetails} id="gyxz">
                            <div className={about.subtitle}>观演须知</div>
                            <div className={about.line}/>
                            <div className={about.tipTitle}>入场时间</div>
                            <div className={about.tip}>演出前约90分钟</div>
                            <div className={about.tipTitle}>禁止携带物品</div>
                            <div className={about.tip}>由于安保和版权的原因，大多数演出、展览及比赛场所禁止携带食品、饮料、专业摄录设备、打火机等物品，请您注意现场工作人员和广播的提示，予以配合</div>
                            <div className={about.tipTitle}>寄存说明</div>
                            <div className={about.tip}>无寄存处，请自行保管携带物品</div>
                            <div className={about.tipTitle}>主要演员（团体）</div>
                            <div className={about.tip}>李荣浩</div>
                            <div className={about.tipTitle}>最低演出时长</div>
                            <div className={about.tip}>120分钟</div>
                            <div className={about.tipTitle}>最低演出曲目数</div>
                            <div className={about.tip}>22首</div>
                            <div className={about.tipTitle}>大麦网首次开售时全场可售门票总张数</div>
                            <div className={about.tip}>3500张</div>
                        </div>
                    </div>
                </div>
                <Bottom/>
            </div>
        )
    }
}
