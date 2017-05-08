
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";


import './_style.scss';
import Icon from "../icon/index";


export default class Button extends Component {

    render() {
        let {className} = this.props;

        className = ClassNames('TechnologySection', 'tech-1', className);



        return (
            <div className={className}>


                <ul className="networks">
                    <li>
						<Icon type="linkedin"/>
						<Icon type="bing"/>
					</li>
                    <li>
						<Icon type="eagle"/>
						<Icon type="facebook"/>
					</li>
					<li>
						<Icon type="fed"/>
						<Icon type="ft"/>
					</li>
					<li>
						<Icon type="gaurdian"/>
						<Icon type="sec"/>
					</li>
					<li>
						<Icon type="google"/>
						<Icon type="twitter"/>
					</li>
					<li>
						<Icon type="buffer"/>
						<Icon type="china-daily"/>
					</li>
                    <li>
						<Icon type="chrome"/>
                    	<Icon type="youtube"/>
					</li>
					<li>
						<Icon type="facebook"/>
						<Icon type="fed"/>
					</li>

					<li className="running"><Icon type="facebook"/></li>
					<li className="running"><Icon type="fed"/></li>
					<li className="running"><Icon type="twitter"/></li>
					<li className="running"><Icon type="sec"/></li>
					<li className="running"><Icon type="gaurdian"/></li>
					<li className="running"><Icon type="linkedin"/></li>
					<li className="running"><Icon type="bing"/></li>
					<li className="running"><Icon type="buffer"/></li>
					<li className="running"><Icon type="chrome"/></li>
				</ul>


                <svg className="funnel" width="418px" height="370px" viewBox="0 0 418 370">
                    <g strokeWidth="1.5" stroke="#FFFFFF" fill="none">
                        <polyline points="377.381701 40 263 153.208613 263 234.175221"/>
                        <polyline transform="translate(90.190851, 187.087610) scale(-1, 1) translate(-90.190851, -187.087610) " points="147.381701 40 33 153.208613 33 334.175221"/>
                        <polyline points="140.156993 328 147.474833 335 154.792672 328"/>
                    </g>
                </svg>

                <h5>
                    1000s of <br/>
                    data sources
                </h5>
            </div>
        );
    }

}




