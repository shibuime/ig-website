
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";


import './_activity-indicator-style.scss';



export default class ActivityIndicator extends Component {

    render() {
        var {className, type} = this.props;

        className = ClassNames('ActivityIndicator', className, type);

        return (
            <div className={className}>
                {type == 'line' &&
                    <div className="line"></div>
                }
                {type == 'svg' &&
                    <svg width="39.5" height="39.4" viewBox="0 0 39.5 39.4">
                        <path d="M873.6,511.4l-13.7-6.8,18.9-8.7,18.9,8.7-13.1,6.8m0,0v22.1m-10.9-22.1v22.1m5.2-37.1v20.4m-5.2,2.8,5.1-2.8m5.6,2.8-5.6-2.8m-5.1,16.7-13.7-5.8V504.6m37.7,0v22.5l-13.1,6.4" transform="translate(-859 -495)"/>
                    </svg>
                }
            </div>
        );
    }

}




