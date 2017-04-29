
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";


import './_button-style.scss';


export default class Button extends Component {

    render() {
        let {className, grey, white, primary, children, small, onClick, to, target, withIcon} = this.props;

        className = ClassNames('Button', className, {
            'With-icon': withIcon,
            'Button-small': small,
            'Button-primary': primary,
            'Button-grey': grey,
            'Button-white': white
        });


        if(to) return (
            <a target={target} href={to} onClick={onClick} className={className}>
                {children}
            </a>
        );

        return (
            <div onClick={onClick} className={className}>
                {children}
            </div>
        );
    }

}




