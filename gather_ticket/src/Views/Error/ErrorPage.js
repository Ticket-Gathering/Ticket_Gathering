import  React,{Component} from 'react'
import Nav from "../../Components/Nav";
import Empty from "antd/es/empty";
import style from './ErrorPage.module.css'

export  default class ErrorPage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <div>
                    <Nav pageIdent="page" history={this.props.history}/>
                </div>
                <div className={style.EmptyContainer}>
                    <div className={style.EmptyBody}>
                        <Empty
                            description={
                                <span className={style.tip}>
                                    该演出信息已丢失！
                                </span>
                            }
                        >

                        </Empty>
                    </div>
                </div>
            </div>
        )
    }

}
