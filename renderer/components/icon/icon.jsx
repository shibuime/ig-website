
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";


import './_icon-style.scss';



export default class Icon extends Component {

    render() {
        var {className, type} = this.props;

        className = ClassNames('Icon', className, 'icon-' + type);

        return (
            <span {...this.props} className={className}></span>
        );
    }

}




