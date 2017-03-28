
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";
import Icon from "../../components/icon/icon.jsx";


import './_button-style.scss';


export default class Button extends Component {

    render() {
        var {className, primary, secondary, secondaryFill, grey, action, children, fat, small, onClick, to, target, withIcon} = this.props;

        className = ClassNames('Button', className, {
            'With-icon': withIcon,
            'Button-small': small,
            'Button-fat': fat,
            'Button-action': action,
            'Button-primary': primary,
            'Button-secondary-fill': secondaryFill,
            'Button-secondary': secondary,
            'Button-secondary-grey': grey
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




