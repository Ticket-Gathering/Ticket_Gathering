import React, { Component } from 'react';
import poster from './posterItem.module.css';
import { withRouter } from 'react-router-dom';

class PosterItem extends Component {
    constructor(props) {
        super(props)
        this.goAbout = this.goAbout.bind(this);
    }

    goAbout() {
        let i = this.props.poster.showId;
        this.props.history.push({ pathname: "/about" + `/${i}` })
    }

    render() {
        return (
            <div className={poster.posterContainer}>
                <div className={poster.posterImgContainer} onClick={this.goAbout}>
                    <img src={this.props.poster.img_url} className={poster.posterImg} />
                </div>
                <div className={poster.posterDetailContainer}>
                    <div className={poster.posterDetailBox}>
                        <div className={poster.name}>{this.props.poster.name}</div>
                        <div className={poster.address}>{this.props.poster.address}</div>
                        <div className={poster.address}>{this.props.poster.show_time}</div>
                    </div>
                    <div className={poster.price}>
                        <span style={{fontSize:20+'px'}}>
                            ￥{this.props.poster.price_low}
                        </span>
                        起
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PosterItem);
